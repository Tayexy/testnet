const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("express.json"); // 🔹 Allow JSON body parsing

const app = express();
app.use(cors());
app.use(bodyParser());

const BOT_TOKEN = "7292151087:AAEXWy2WLHDHa4JF0jT-W_YH1gH8lNBW6Bc";
const CHAT_ID = "848792675";

app.post("/notify-telegram", async (req, res) => {
  const { browser, city, country } = req.body;
  const message = `🚀 Visitor Alert!\n🌍 Location: ${city}, ${country}\n🖥️ Browser: ${browser}`;
  
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(message)}`;
  
  try {
    await axios.get(url);
    console.log("✅ Notification sent to Telegram!");
    res.send("✅ Notification sent!");
  } catch (error) {
    console.error("❌ Error sending Telegram notification:", error);
    res.status(500).send("❌ Error sending notification.");
  }
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});