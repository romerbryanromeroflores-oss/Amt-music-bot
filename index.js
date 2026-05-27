const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');

const app = express();

app.get('/', (req, res) => {
  res.send('AMT Music Bot is running!');
});

app.listen(3000, () => {
  console.log('Web server running.');
});

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login('MTUwODkwMTEwNzU1OTMwNTM0Ng.GXndwA.SWdelmWkJnd4bNruXBdKYiGoCkymBVqBa0j0SM')
  .then(() => console.log('Bot login successful'))
  .catch(err => console.error(err));
