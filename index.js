const { Client, GatewayIntentBits } = require('discord.js');
const { DisTube } = require('distube');
const { YouTubePlugin } = require('@distube/youtube');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const distube = new DisTube(client, {
    emitNewSongOnly: true,
    plugins: [new YouTubePlugin()]
});

client.once('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'play') {
        const song = interaction.options.getString('song');

        if (!interaction.member.voice.channel) {
            return interaction.reply('❌ You must join a voice channel first.');
        }

        await interaction.reply(`🎵 Playing: **${song}**`);

        distube.play(interaction.member.voice.channel, song, {
            textChannel: interaction.channel,
            member: interaction.member
        });
    }

    if (commandName === 'skip') {
        distube.skip(interaction.guild);
        interaction.reply('⏭️ Skipped the song.');
    }

    if (commandName === 'pause') {
        distube.pause(interaction.guild);
        interaction.reply('⏸️ Music paused.');
    }

    if (commandName === 'resume') {
        distube.resume(interaction.guild);
        interaction.reply('▶️ Music resumed.');
    }

    if (commandName === 'leave') {
        distube.voices.leave(interaction.guild);
        interaction.reply('👋 Left the voice channel.');
    }
});

client.login('MTUwODkwMTEwNzU1OTMwNTM0Ng.Gwaz9t.CT3nhIpfN-ZvYZ15QYELcR2yXXEZ6TLcXu_BhM');
