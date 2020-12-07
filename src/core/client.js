const Discord = require('discord.js');
const config = require('./config/config.json');

const client = new Discord.Client({
    disableMentions: 'everyone',
});

const ratelimitCooldown = new Set();

const cooldowns = new Discord.Collection();

client.commands = new Discord.Collection();

client.login(process.env.TOKEN);

module.exports = { client, ratelimitCooldown, cooldowns, config };
