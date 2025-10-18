"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const node_cron_1 = __importDefault(require("node-cron"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const token = process.env.TOKEN;
const ChatId = process.env.CHAT_ID;
const repeat = 5;
const intervalMs = 2000;
const bot = new node_telegram_bot_api_1.default(token, { polling: true });
function sendNotification() {
    let count = 0;
    const interval = setInterval(() => {
        count++;
        bot.sendMessage(ChatId, `Hii Sanjay!  Time to Upload Reels (${count}/${repeat})`);
        if (count >= repeat) {
            clearInterval(interval);
            console.log(" Finished sending 5 notifications.");
        }
    }, intervalMs);
}
// Schedule messages at 8:30 AM and 3:37 PM
node_cron_1.default.schedule("30 8 * * *", sendNotification);
node_cron_1.default.schedule("50 20 * * *", sendNotification);
console.log("Bot is running... Notifications will be sent 5 times (every 2 sec) at 8:30 AM & 8:50 PM daily.");
// sendNotification();
