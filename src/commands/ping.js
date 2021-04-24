const cmds = require('../core/config/commands.json');
module.exports = {
    name: 'ping',
    description: 'Displays the bots websocket ping',
    aliases: ['p'],
    args: false,
    usage: '',
    cooldown: 3,
    execute: async (message) => {
        if (cmds.enabledCommands.ping) {
            return message.channel.send(`Pong! \`${message.client.ws.ping}ms\``);
        }
    },
};
