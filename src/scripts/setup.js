const prompts = require('prompts');
const fs = require('fs');

require('dotenv').config();

/* The Setup File

This file is ran to configure the bot to provide an easier experience for users 

This file must be updated with new configuration options when the bot is updated, as well as new translations

*/

console.log('-----------------------------------\n          Bot Configuration\n-----------------------------------\n');

const questions = [
    // The bots token
    {
        type: 'text',
        name: 'token',
        message: 'Bot Token?',
        initial: process.env.TOKEN || 'https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot',
    },
    // The bots prefix
    {
        type: 'text',
        name: 'prefix',
        message: 'Bot Prefix?',
        initial: process.env.prefix || '!',
    },
    // The guild ID
    {
        type: 'text',
        name: 'guildID',
        message: 'Guild ID?',
        initial: process.env.guildID || 'https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID',
    },
    // The channel ID
    {
        type: 'text',
        name: 'channelID',
        message: 'Channel ID?',
        initial: process.env.channelID || 'https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID',
    },
    // The role ID
    {
        type: 'text',
        name: 'roleID',
        message: 'Role ID?',
        initial: process.env.roleID || 'https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID',
    },
    // The admin role ID
    {
        type: 'text',
        name: 'adminRoleID',
        message: 'Admin Role ID?',
        initial: process.env.adminRoleID || 'https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID',
    },

    // Allow Commands
    {
        type: 'toggle',
        name: 'allowCommands',
        message: 'Allow Commands?',
        initial: true,
        active: 'yes',
        inactive: 'no',
    },
    // Admin only commands
    {
        type: 'toggle',
        name: 'adminOnlyCmds',
        message: 'Admin Only Commands?',
        initial: false,
        active: 'yes',
        inactive: 'no',
    },
    // Debug Mode
    {
        type: 'toggle',
        name: 'enableDebugLogs',
        message: 'Enable Debug Logs?',
        initial: false,
        active: 'yes',
        inactive: 'no',
    },
];

const onCancel = () => {
    console.log('\x1b[31m', "Configuration was cancelled, to start again, use 'npm run config'", '\x1b[0m');
    process.exit(0);
};

(async () => {
    // Get the response from the prompts
    const response = await prompts(questions, { onCancel });

    // Warn if escape character detected
    if (response.prefix.match(/\\/g)) return console.error('\x1b[31m', '\nYour prefix contains an escape character, configuration aborted.\n', '\x1b[0m');

    console.log(`\n-----------------------------------\n          Bot Configured\n-----------------------------------\n\nTo reconfigure, simply do 'npm run config'\n`);

    // Write the bots authentication token
    fs.writeFile(
        '.env',
        `
    TOKEN=${response.token}
    guildID=${response.guildID}
    channelID=${response.channelID}
    roleID=${response.roleID}
    adminRoleID=${response.adminRoleID}
    enableDebugLogs=${response.enableDebugLogs}

    prefix=${response.prefix}
    allowCommands=${response.allowCommands}
    adminOnlyCmds=${response.adminOnlyCmds}
`,

        (err) => {
            if (err) throw err;
        },
    );

    // End of writing
})();
