import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PI_API = "https://api.minepi.com/v2";

app.post("/api/login/start", async (req, res) => {
  try {
    const response = await fetch(`${PI_API}/apps/${process.env.PI_APP_ID}/login/start`, {
      method: "POST",
      headers: {
        Authorization: `Key ${process.env.PI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // You can add user meta info here if needed
        scopes: ["username", "payments"],
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Pi API Error:", text);
      return res.status(500).json({ error: "Failed to start login" });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Backend error:", err);
    res.status(500).json({ error: "Backend connection failed" });
  }
});

app.listen(8080, () => console.log("Backend running on port 8080"));ecosystem.config.js
ecosystem.config.js
