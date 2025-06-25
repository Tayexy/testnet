const TelegramBot = require('node-telegram-bot-api');

// Your actual bot token
const token = '7292151087:AAEXWy2WLHDHa4JF0jT-W_YH1gH8lNBW6Bc';

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const chatTitle = msg.chat.title || msg.chat.username || 'Private Chat';
  console.log(`Chat ID: ${chatId}`);
  console.log(`Chat Name: ${chatTitle}`);
});
