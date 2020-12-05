const Discord = require('discord.js');
const config = require('./config/config.json');
const functions = require('./functions');
require('dotenv').config();

// Discord Client configuration
const client = new Discord.Client();

functions.configuration.check();

// The ready event is omitted when the bot has logged in and is able to use the API - this is where the message
// time starts counting from, and will be every time the elapsed time has passed.
client.on('ready', async () => {
    // Successful login to discord and the bot is in the ready state
    console.log(`Logged in at ${new Date()}`);

    // Do some checks to make sure the data given is usable
    let guild =
        (await client.guilds.cache.get(config.setup.guildID)) ||
        functions.omit.error(`You have not specified a valid guild id or I am not apart of that guild yet, please ensure I am inside of that guild before retrying.`, 1);

    let channel = (await guild.channels.cache.find((channel) => channel.id === config.setup.channelID)) || functions.omitError(`The specified channel does not appear to exist.`, 1);

    let role = (await guild.roles.cache.find((role) => role.id === config.setup.roleID)) || functions.omitError(`The specified role does not appear to exist.`, 1);
    // End of those checks

    setInterval(() => {
        functions.hydroMessage.send(channel, role);
    }, config.message.intervalInSeconds * 1000);
});

// The message event, no command handler present due to the fact there is only three commands for this entire bot
// If you look to expand this project, it may be worth using a command handler and perhaps even using an events file
// as this is more optimal then just creating a lot of checks in the message event instead.
client.on('message', async (message) => {
    // Check if commands can even be run
    if (!message.guild) return;
    if (config.setup.guildID != message.guild.id) return;
    if (!config.commandConfig.allowCommands) return;
    if (config.commandConfig.adminOnlyCmds && !message.member.roles.cache.has(config.setup.adminRoleID)) return;

    // Error variable
    let errorOccured = false;

    // PING COMMAND
    if (message.content.toLowerCase().startsWith(`${config.commandConfig.prefix}ping`) && config.enabledCommands.ping) {
        return message.channel.send(`Pong! \`${client.ws.ping}ms\``);
    }

    // OPT IN COMMAND
    else if (message.content.toLowerCase().startsWith(`${config.commandConfig.prefix}optin`) && config.enabledCommands.optin) {
        // Find the configured ping role
        let role = (await message.guild.roles.cache.find((role) => role.id === config.setup.roleID)) || functions.omitError(`The specified role does not appear to exist.`, 1);
        // Check if the member has the role
        if (message.member.roles.cache.has(role.id)) return message.channel.send(`${message.author}! You already have the role.`);
        // Give the member the role
        await message.member.roles.add(role, `You have been given the role \`${role.name}\`.`).catch(() => {
            // If the bot lacks the permissions, send an error
            errorOccured = true;
        });
        if (errorOccured) return message.channel.send(`I was unable to add you to the role, maybe I lack the permissions or the role is managed by an extension.`);
        // Final confirmation message
        return message.channel.send(`Okay, ${message.author}, you have been given the \`${role.name}\` role.`);
    }

    // OPT OUT COMMAND
    else if (message.content.toLowerCase().startsWith(`${config.commandConfig.prefix}optout`) && config.enabledCommands.optout) {
        // Find the configured ping role
        let role = (await message.guild.roles.cache.find((role) => role.id === config.setup.roleID)) || functions.omitError(`The specified role does not appear to exist.`, 1);
        // Check if the member has the role
        if (!message.member.roles.cache.has(role.id)) return message.channel.send(`${message.author}! You don't have the role.`);
        // Give the member the role
        await message.member.roles.remove(role, 'Opted out of role pings').catch(() => {
            // If the bot lacks the permissions, send an error
            errorOccured = true;
        });
        if (errorOccured) return message.channel.send(`I was unable to remove the role from you, maybe I lack the permissions or the role is managed by an extension.`);
        // Final confirmation message
        return message.channel.send(`Okay, ${message.author}, you have been removed from the \`${role.name}\` role.`);
    }
});

// Log into discord
client.login(process.env.TOKEN);
