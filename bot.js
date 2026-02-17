const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on('ready', () => {
  console.log(`Bot logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const text = message.content.trim();

const match = text.match(/(รับ|ปิด)\s+(IT\d{2}-\d{3})/i);

if (match) {
  const action = match[1];
  const ticketId = match[2];

  await axios.post(process.env.GAS_WEBHOOK, {
    source: "discord",
    message: text,
    admin: message.author.username
  });

  if (action === "รับ") {
    await message.reply(`✅ ${ticketId}\nStatus: IN_PROGRESS`);
  }

  if (action === "ปิด") {
    await message.reply(`✅ ${ticketId}\nStatus: DONE`);
  }
}

});

client.login(process.env.BOT_TOKEN);
