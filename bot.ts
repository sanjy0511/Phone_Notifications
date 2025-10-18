import TelegramBot from "node-telegram-bot-api";
import cron from "node-cron";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.TOKEN!;
const ChatId = process.env.CHAT_ID!;
const repeat = 5;
const intervalMs = 2000;

const bot = new TelegramBot(token, { polling: true });

function sendNotification() {
  let count = 0;

  const interval = setInterval(() => {
    count++;
    bot.sendMessage(
      ChatId,
      `Hii Sanjay!  Time to Upload Reels (${count}/${repeat})`
    );

    if (count >= repeat) {
      clearInterval(interval);
      console.log(" Finished sending 5 notifications.");
    }
  }, intervalMs);
}

// Schedule messages at 8:30 AM and 3:37 PM
cron.schedule("30 8 * * *", sendNotification);
cron.schedule("50 20 * * *", sendNotification);

console.log(
  "Bot is running... Notifications will be sent 5 times (every 2 sec) at 8:30 AM & 8:50 PM daily."
);
// sendNotification();
