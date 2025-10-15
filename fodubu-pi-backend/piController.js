fodubu-pi-backend/
├─ controllers/
│   └─ piController.js
├─ utils/
│   └─ piClient.js

controllers/

import { selectNetwork } from './utils/piClient.js';
console.log(selectNetwork());

const { selectNetwork, piFetch } = await import('./utils/piClient.js');

console.log(selectNetwork());

const piClient = await import('./utils/piClient.js');

async function testPiClient() {
  const { selectNetwork, piFetch } = await import('./utils/piClient.js');
  console.log(selectNetwork());
}


testPiClient();

async function testPiClient() {
  const { selectNetwork, piFetch } = await import('./utils/piClient.js');

  // Get network info
  const net = selectNetwork();
  console.log('Network:', net);

  // Example test path (replace with a real Pi API path)
  const path = '/apps/' + net.appId + '/login/start'; 
  const result = await piFetch(path, { method: 'GET' }); // or POST if needed
  console.log('Pi fetch result:', result);
}

testPiClient();

async function testPiClient() {
  const { selectNetwork, piFetch } = await import('./utils/piClient.js');

  // Pick network
  const net = selectNetwork();
  console.log('Network config:', net);

  // Body required by Pi login/start API
  const body = {
    scopes: ['username', 'payments']
  };

  // Call Pi API
  const path = `/apps/${net.appId}/login/start`; 
  const result = await piFetch(path, { 
    method: 'POST', 
    body: JSON.stringify(body)
  });

  console.log('Pi API response:', result);
}

// Run the test
testPiClient();

—-

const piClient = await import('./piClient.js'); // notice just ./piClient.js

const piClient = await import('./utils/piClient.js');
const net = piClient.selectNetwork();
console.log('Network config:', net);

const path = `/apps/${net.appId}/login/start`;
const result = await piClient.piFetch(path, { 
  method: 'POST', 
  body: JSON.stringify({ scopes: ['username', 'payments'] }) 
});
console.log('Pi API response:', result);

Testing client


(async () => {
  try {
    // Dynamic import of your piClient module
    const piClient = await import('./utils/piClient.js');

    // Get network info
    const net = piClient.selectNetwork();
    console.log('Network config:', net);

    // Example Pi API call: login/start
    const path = `/apps/${net.appId}/login/start`;
    const body = { scopes: ['username', 'payments'] };

    const result = await piClient.piFetch(path, { 
      method: 'POST', 
      body: JSON.stringify(body) 
    });

    console.log('Pi API response:', result);

  } catch (err) {
    console.error('Error during test:', err);
  }
})();

—

(async () => {
  try {
    const piClient = await import('./utils/piClient.js');

    const net = piClient.selectNetwork();
    console.log('Network config:', net);

    const path = `/apps/${net.appId}/login/start`;
    const result = await piClient.piFetch(path, {
      method: 'POST',
      body: JSON.stringify({ scopes: ['username', 'payments'] })
    });

    console.log('Pi API response:', result);

  } catch (err) {
    console.error('Error:', err.message);
  }
})();

(async () => {
  const piClient = await import('./utils/piClient.js');
  const net = piClient.selectNetwork();
  console.log('Network config:', net);
})();



    // 1️⃣ Import your Pi client module
    const piClient = await import('./utils/piClient.js');

    // 2️⃣ Select network (MAINNET or TESTNET)
    const net = piClient.selectNetwork();
    console.log('Network config:', net);

    // 3️⃣ Prepare Pi login/start API request
    const path = `/apps/${net.appId}/login/start`;
    const body = { scopes: ['username', 'payments'] };

    // 4️⃣ Call Pi API
    const result = await piClient.piFetch(path, {
      method: 'POST',
      body: JSON.stringify(body)
    });

    // 5️⃣ Print real API response
    console.log('Pi API response:', result);

  } catch (err) {
    console.error('Error calling Pi API:', err);
  }
})();

—--



(async () => {
  try {
    // Import Pi client module
    const { selectNetwork, piFetch } = await import('./utils/piClient.js');

    // Get network configuration
    const net = selectNetwork();
    console.log('Network config:', net);

    // Call Pi login/start endpoint
    const path = `/apps/${net.appId}/login/start`;
    const body = { scopes: ['username', 'payments'] };

    const result = await piFetch(path, {
      method: 'POST',
      body: JSON.stringify(body)
    });

    // Print the real API response
    console.log('Pi API response:', result);

  } catch (err) {
    console.error('Error calling Pi API:', err);
  }
})();
