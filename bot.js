const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

console.log("Starting login...");
console.log("Token exists:", !!process.env.BOT_TOKEN);

client.on("ready", () => {
  console.log("✅ BOT ONLINE:", client.user.tag);
});

client.login(process.env.BOT_TOKEN)
  .catch(err => console.error("LOGIN ERROR:", err));
