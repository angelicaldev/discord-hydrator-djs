const Discord = require('discord.js');

const client = new Discord.Client({
    disableMentions: 'everyone',
});

const ratelimitCooldown = new Set();

const cooldowns = new Discord.Collection();

client.commands = new Discord.Collection();

client.login(process.env.TOKEN);

module.exports = { client, ratelimitCooldown, cooldowns };
