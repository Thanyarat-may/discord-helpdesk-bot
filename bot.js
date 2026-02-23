const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');

console.log("FILE STARTED");

const app = express();

app.listen(process.env.PORT || 3000, () => {
  console.log("Web server ready");
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on("ready", () => {
  console.log("BOT ONLINE:", client.user.tag);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.content === "ping") {
    message.reply("pong");
  }
});

client.login(process.env.BOT_TOKEN)
  .then(() => console.log("LOGIN SUCCESS"))
  .catch(err => console.error("LOGIN ERROR:", err));
