const express = require('express');
const {
  Client,
  GatewayIntentBits,
  SlashCommandBuilder,
  REST,
  Routes
} = require('discord.js');

const { DisTube } = require('distube');
const { YouTubePlugin } = require('@distube/youtube');

const TOKEN = process.env.TOKEN;
const CLIENT_ID = '1508901107559305346';

const app = express();

app.get('/', (req, res) => {
  res.send('AMT Music Bot is running!');
});

app.listen(3000, () => {
  console.log('Web server running.');
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ]
});

const distube = new DisTube(client, {
  plugins: [new YouTubePlugin()]
});

const commands = [
  new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a song')
    .addStringOption(option =>
      option
        .setName('song')
        .setDescription('Song name or URL')
        .setRequired(true)
    )
    .toJSON()
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log('Registering slash commands...');

    await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: commands }
    );

    console.log('Slash commands registered.');
  } catch (error) {
    console.error(error);
  }
})();

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'play') {
    const song = interaction.options.getString('song');
    const voiceChannel = interaction.member.voice.channel;

    if (!voiceChannel) {
      return interaction.reply('Join a voice channel first.');
    }

    await interaction.reply(`Playing: ${song}`);

    distube.play(voiceChannel, song, {
      textChannel: interaction.channel,
      member: interaction.member
    });
  }
});

client.login(TOKEN);
