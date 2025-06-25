import React, { useState } from "react";

function TelegramTester() {
  const [chatId, setChatId] = useState("");
  const [status, setStatus] = useState("");

  const botToken = "7292151087:AAEXWy2WLHDHa4JF0jT-W_YH1gH8lNBW6Bc"; // Replace with your actual bot token

  const handleTest = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    const testMessage = "✅ Test message from Telegram bot.";

    try {
      const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: testMessage,
        }),
      });

      const data = await res.json();

      if (data.ok) {
        setStatus("✅ Message sent successfully!");
      } else {
        setStatus(`❌ Failed: ${data.description}`);
      }
    } catch (err) {
      setStatus("❌ Error sending message. Check console.");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h3>Test Telegram Chat ID</h3>
      <form onSubmit={handleTest}>
        <label>Telegram Chat ID:</label>
        <input
          type="text"
          value={chatId}
          onChange={(e) => setChatId(e.target.value)}
          required
          placeholder="e.g. 123456789"
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <button type="submit">Send Test Message</button>
      </form>
      <p style={{ marginTop: "10px" }}>{status}</p>
    </div>
  );
}

export default TelegramTester;
