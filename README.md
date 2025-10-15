FODUBU – Force Du Développement Ubuntu du Burundi

🌟 Vision

FODUBU is designed to empower the Burundian community through dynamic blockchain integration, leveraging Pi Network for economic engagement. Our platform aims for a fully dynamic, future-ready website with motivational visuals and high-standard features.


-
🛠️ Technology Stack

Backend: Node.js, Express

Database: MongoDB

Reverse Proxy / Web Server: Nginx

Process Management: PM2

Frontend: React (Dynamic, Motivational, Responsive)

Authentication & Flow: Pi Network SDK

🧑‍💻 Initial Development

Environment Variables

Create a .env file in the root:

PORT=0000
PI_APP_ID=your_pi_app_id
PI_API_KEY=your_api_key
MONGO_URI=your_mongo_connection
JWT_SECRET=your_supersecret
📦 Deployment

Using PM2

pm2 start server.js --name fodubu-mainnet
pm2 save
pm2 startup

Using Nginx Reverse Proxy

/etc/nginx/sites-available/fodubu.conf:

server {
    listen 80;
    server_name api.fodubu.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

Enable and restart:

sudo ln -sf /etc/nginx/sites-available/fodubu.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx


---

🔄 Flows & Pi Network Integration

Flow	Description

/auth/pi-login	Handles Pi authentication
/api/earnings	Fetches user earnings
/pay/pi-transaction	Submits Pi transactions
/verify/frontend	Communicates with React frontend


.


---

🖼 Motivational Visuals

We include dynamic Unsplash images to inspire users:

Innovation

Growth

Community

Blockchain / Pi Network Vision



---

🛣️ Roadmap & Future Features

Full Mainnet Launch

Dynamic Earnings Dashboard

Mobile Optimization

Community Referral System

Enhanced Security & Performance



---

📄 License & Contribution

License: MIT (See LICENSE file)

Contributing: Please fork the repo and submit pull requests. For major changes, open an issue first.



---

FODUBU – Empowering Burundi through Pi Network and Dynamic Blockchain Solutions

* 🌐 **Cloud-hosted frontend** with backend microservices (Dockerized)

## 🏗️ Tech Stack
* **Frontend:**javascript (optimized for Pi Browser)  
* **Backend:** node+express(database structure & queries), js,REST API  
* **Database:** MYSQL / Pi-based payment listener  
* **Deployment:**Cloudflare pages(frontend,react)& DigitalOcean Droplet(backend)  
* **Containerization:** Docker & Docker-Compose  
* **License:** MIT  
