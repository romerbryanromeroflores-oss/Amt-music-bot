const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const commands = [
    new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song')
        .addStringOption(option =>
            option.setName('song')
                .setDescription('Song name or YouTube URL')
                .setRequired(true)
        ),

    new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip the current song'),

    new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pause the music'),

    new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Resume the music'),

    new SlashCommandBuilder()
        .setName('leave')
        .setDescription('Leave the voice channel')

].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken('MTUwODkwMTEwNzU1OTMwNTM0Ng.Gwaz9t.CT3nhIpfN-ZvYZ15QYELcR2yXXEZ6TLcXu_BhM');

(async () => {
    try {
        console.log('🔄 Registering slash commands...');

        await rest.put(
            Routes.applicationCommands('1508901107559305346'),
            { body: commands }
        );

        console.log('✅ Slash commands registered.');
    } catch (error) {
        console.error(error);
    }
})();
