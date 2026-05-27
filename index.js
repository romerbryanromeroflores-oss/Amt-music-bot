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
  intents: [
    GatewayIntentBits.Guilds
  ]
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login('MTUwODkwMTEwNzU1OTMwNTM0Ng.G6Ba1H.tbmrL23ze3hxPFDgJ2ya0pdPjOvxmvAO6RTWIE')
  .then(() => console.log('Bot login successful'))
  .catch(err => console.error(err));
