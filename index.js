const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');

const app = express();

app.get('/', (req, res) => {
  res.send('Bot is running!');
});

app.listen(3000);

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login('MTUwODkwMTEwNzU1OTMwNTM0Ng.GTPis5.dkC1Qc7nfWflmhjzrTJ8oGepmRqmPqS58QJTmk').catch(console.error);
