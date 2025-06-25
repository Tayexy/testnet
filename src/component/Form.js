import React from 'react';
import "./Heros.css";
import { ToastContainer, toast } from "react-toastify";

function Form() {
  const handleForm = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    const telegramMessage = `📩 New Message from Website:
👤 Name: ${name}
📧 Email: ${email}
📝 Message: ${message}`;

    const botToken = "7292151087:AAEXWy2WLHDHa4JF0jT-W_YH1gH8lNBW6Bc";

    // ✅ Add multiple chat IDs (your own and your colleague's)
    const chatIds = ["848792675", "1432536980"]; // Replace with real chat IDs

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
      await Promise.all(
        chatIds.map(chatId =>
          fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chat_id: chatId,
              text: telegramMessage,
            }),
          })
        )
      );

      toast.success("✅ Message sent to Telegram!", {
        position: "top-center",
      });
      e.target.reset(); // Clear form

      // Optional: redirect to bot
      window.location.href = 'https://t.me/Tayexybot';
    } catch (error) {
      console.error("❌ Error sending message to Telegram:", error);
      toast.error("❌ Failed to send message.");
    }
  };

  return (
    <>
      <form className="form-container" onSubmit={handleForm}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" required></textarea>
        <button type="submit">Submit</button>
      </form>
      <ToastContainer />
    </>
  );
}

export default Form;
