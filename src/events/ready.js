const message = require('../core/config/message.json');
const functions = require('../functions');
module.exports = async (client) => {
    // Successful login to discord and the bot is in the ready state
    console.log(`✅ Logged in as ${client.user.tag} at ${new Date()}`);

    // Check the configuration
    functions.configuration.check();

    // Do some checks to make sure the data given is usable
    let guild =
        (await client.guilds.cache.get(process.env.guildID)) ||
        functions.emit.error(`You have not specified a valid guild id or I am not apart of that guild yet, please ensure I am inside of that guild before retrying.`, 1);

    let channel = (await guild.channels.cache.find((channel) => channel.id === process.env.channelID)) || functions.emit.error(`The specified channel does not appear to exist.`, 1);

    let role = (await guild.roles.cache.find((role) => role.id === process.env.roleID)) || functions.emit.error(`The specified role does not appear to exist.`, 1);
    // End of those checks

    setInterval(() => {
        functions.hydroMessage.send(channel, role);
    }, message.intervalInSeconds * 1000);
};
