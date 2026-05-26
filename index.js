const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login('MTUwODkwMTEwNzU1OTMwNTM0Ng.GXndwA.SWdelmWkJnd4bNruXBdKYiGoCkymBVqBa0j0SM');