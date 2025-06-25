const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());  // This is needed to parse JSON data

const BOT_TOKEN = "7292151087:AAEXWy2WLHDHa4JF0jT-W_YH1gH8lNBW6Bc";
const CHAT_IDS = ["-4682335715"];  // Your group chat ID

// POST route to handle the incoming notification
app.post("/notify-telegram", async (req, res) => {
  const { browser, ip, city, country } = req.body;

  if (!browser || !ip || !city || !country) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  console.log("📩 Notification request received:", req.body);

  const message = `🚀 Visitor Alert!
🌍 Location: ${city}, ${country}
🖥️ Browser: ${browser}
🌐 IP: ${ip}`;

  let errors = [];

  for (const chatId of CHAT_IDS) {
    try {
      const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
      await axios.post(url, {
        chat_id: chatId,
        text: message,
      });
      console.log(`✅ Notification sent to ${chatId}`);
    } catch (error) {
      console.error(`❌ Failed to send to ${chatId}:`, error.response?.data || error.message);
      errors.push(chatId);
    }
  }

  if (errors.length > 0) {
    return res.status(207).json({ error: `Failed to send to: ${errors.join(", ")}` });
  }

  return res.status(200).send("✅ All notifications sent");
});

// Set the port to 3000
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
