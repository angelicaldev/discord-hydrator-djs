const { Collection } = require('discord.js');
const { ratelimitCooldown: rCooldowns, cooldowns, config: cfg } = require('../core/client.js');
//const functions = require('./functions');

module.exports = async (client, message) => {
    /* If the author is a bot, if the message is sent in DM, the bot is set to ignore commands, or the guild is not the one specified in the configuration */
    if (message.author.bot || !message.guild || cfg.setup.guildID != message.guild.id || !cfg.commandConfig.allowCommands) return;
    /* The bot is set to admin only commands mode, and the user does not have the configured role */
    if (cfg.commandConfig.adminOnlyCmds && !message.member.roles.cache.has(cfg.setup.adminRoleID)) return;

    /* This is where we define arguments, command name and find the command to execute, if no command is found; return */
    const args = message.content.slice(cfg.commandConfig.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

    if (message.content.startsWith(cfg.commandConfig.prefix)) {
        /* This is where we check if the message starts with the prefix defined in ./core/config.json, if not; return */
        /* Easy Ratelimit Cooldown */
        if (rCooldowns.has(message.author.id)) return;
        rCooldowns.add(message.author.id);
        setTimeout(() => {
            rCooldowns.delete(message.author.id);
        }, 630);
    }

    /* If the command requires args and the user does not pass them; tell the user the correct usage of the command and return */
    if (command.args && !args.length) {
        /* Send the error message; delete the authors message and error message after elapsed time */
        let errmsg = await message.channel.send(`\`Incorrect usage! The correct usage is: \n \`${cfg.prefix}${commandName} ${command.usage}\``);
        message.delete({ timeout: 6000 });
        return errmsg.delete({ timeout: 8000 });
    }

    /* Per-Command cooldown is handled here, if a user uses the same command before the cooldown has ended, deny the user from using the command */
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            let cooldownMessage = await message.channel.send(`${message.author}, Please wait ${timeLeft.toFixed(1)} more second(s) before using \`${commandName}\` again.`);
            message.delete({ timeout: 4000 }).catch(() => {});
            return cooldownMessage.delete({ timeout: 2500 }).catch(() => {
                return;
            });
        }
    }

    try {
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        /* Execute the command */
        command.execute(message, args);
    } catch (error) {
        /* If we end up here; that means the command has failed to execute properly. */
        console.error(error);
        message.channel.send('An unexpected error occured.');
    }
};
