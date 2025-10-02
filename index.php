<?php
// --- CONFIGURATION ---
header("Content-Type: application/json");
$host = 'localhost';
$db_name = 'fodubu E-Commerce';
$username = 'root'; // Your DB username
$password = '';     // Your DB password
$pi_gcv_rate = 314.159;
$pi_api_key = 'YOUR_PI_API_KEY'; // Get this from your Pi App Developer Portal

// --- CORS HEADERS ---
header("Access-Control-Allow-Origin: https://fodubu.com");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// --- DATABASE CONNECTION ---
try {
    $db = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

// --- API ROUTER ---
$action = $_GET['action'] ?? '';

switch ($action) {
    case 'get_products':
        getProducts($db, $pi_gcv_rate);
        break;
    case 'create_payment':
        createPayment($db);
        break;
    case 'onComplete': // Server-to-server callback from Pi
        handlePiCompletion($db, $pi_api_key);
        break;
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Action not found']);
}

// --- API FUNCTIONS ---
function getProducts($db, $rate) {
    $stmt = $db->query("SELECT * FROM products");
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    foreach ($products as &$product) {
        $product['pricePi'] = $product['price_usd'] / $rate;
    }
    
    echo json_encode($products);
}

function createPayment($db) {
    $data = json_decode(file_get_contents('php://input'), true);
    $userId = $data['userId'] ?? 1; // In a real app, get this from a user session
    $totalPi = $data['totalPi'] ?? 0;

    if ($totalPi <= 0) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid amount']);
        return;
    }

    // This is a placeholder for the real Pi Payment ID which we'll get from Pi's response
    // For now, we create a unique ID to track the order.
    $paymentId = uniqid('pi_');

    $stmt = $db->prepare("INSERT INTO orders (user_id, pi_payment_id, total_pi, status) VALUES (?, ?, ?, 'pending')");
    $stmt->execute([$userId, $paymentId, $totalPi]);
    
    // This is the data the frontend needs to initiate the Pi SDK payment
    echo json_encode([
        'paymentId' => $paymentId, // Our internal ID
        'amount' => (float)$totalPi,
        'memo' => 'Order from Pi Commerce Hub',
        'metadata' => ['orderId' => $db->lastInsertId()] // Pass our DB order ID
    ]);
}

function handlePiCompletion($db, $apiKey) {
    // IMPORTANT: This happens on your server, not in the user's browser.
    // Pi's servers will call this URL: https://yourdomain.com/api.php?action=onComplete
    $data = json_decode(file_get_contents('php://input'), true);

    // 1. Get the payment data from Pi
    $paymentId = $data['paymentId'];
    $txid = $data['txid'];
    $orderId = $data['metadata']['orderId'];

    // 2. SECURITY: Verify the payment with Pi's servers using your API Key
    // This is a conceptual example of the verification step.
    // $verification_url = "https://api.pi.network/v2/payments/" . $paymentId;
    // $headers = ['Authorization: Key ' . $apiKey];
    // ... use cURL to make the request and verify txid, amount, etc. ...
    $isVerified = true; // Assume verification is successful for this example

    if ($isVerified) {
        // 3. Update your database
        $stmt = $db->prepare("UPDATE orders SET status = 'completed' WHERE id = ? AND status = 'pending'");
        $stmt->execute([$orderId]);

        // 4. Respond to Pi's servers
        http_response_code(200);
        echo json_encode(['status' => 'success']);

        // 5. (Optional) Use Node.js/Websockets to notify the user's browser in real-time
        // that the payment is complete.
    } else {
        http_response_code(400);
        echo json_encode(['status' => 'verification_failed']);
    }
}
?>