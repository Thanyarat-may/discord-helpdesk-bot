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

const match = text.match(/^IT\d{2}-\d{3}$/i);

if (match) {

  const res = await axios.post(process.env.GAS_WEBHOOK, {
    source: "discord",
    message: text
  });

  const result = res.data.result;

  if (result === "ACCEPTED") {
    await message.reply(`✅ ${text}\nสถานะ: กำลังดำเนินการ`);
  }

  else if (result === "CLOSED") {
    await message.reply(`✅ ${text}\nสถานะ: เสร็จสิ้น`);
  }

  else if (result === "ALREADY_DONE") {
    await message.reply(`⚠️ ${text}\nเคสนี้ปิดเรียบร้อยแล้ว`);
  }

  else if (result === "NOT_FOUND") {
    await message.reply(`❌ ไม่พบ Ticket นี้`);
  }

  else {
    await message.reply(`⚠️ ไม่สามารถอัปเดตสถานะได้`);
  }
}

});

client.login(process.env.BOT_TOKEN);
