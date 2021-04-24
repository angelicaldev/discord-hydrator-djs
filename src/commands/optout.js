require('dotenv').config();
const cmds = require('../core/config/commands.json');
const functions = require('../functions');
module.exports = {
    name: 'optout',
    description: 'Opt a user out of the given role',
    aliases: ['in', 'opt-in'],
    args: false,
    usage: '',
    cooldown: 3,
    execute: async (message) => {
        if (cmds.enabledCommands.optout) {
            let errorOccured = false;
            // Find the configured ping role
            let role = (await message.guild.roles.cache.find((role) => role.id === process.env.roleID)) || functions.emit.error(`The specified role does not appear to exist.`, 1);
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
    },
};
