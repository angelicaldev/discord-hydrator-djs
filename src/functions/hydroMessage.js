const config = require('../core/config/config.json');
const functions = require('.');

const send = async (channel, role) => {
    // Build the message
    await role.setMentionable(true, `Making the role mentionable to send the hydration reminder. Timestamp: ${new Date()}`).catch((error) => {
        console.warn(error);
    });

    if (config.message.useEmbeds) {
        let embed = functions.embed.build();

        channel.send(`${role} ${config.message.plainMessage}`, embed).catch(async (error) => {
            await role.setMentionable(false, `Making the role unmentionable as the hydration reminder has been sent. Timestamp: ${new Date()}`).catch(() => {
                return;
            });
            return console.error(error);
        });
    } else {
        channel.send(`${role} ${config.message.plainMessage}`).catch(async (error) => {
            await role.setMentionable(false, `Making the role unmentionable as the hydration reminder has been sent. Timestamp: ${new Date()}`).catch(() => {
                return;
            });
            return console.error(error);
        });
    }
    await role.setMentionable(false, `Making the role unmentionable as the hydration reminder has been sent. Timestamp: ${new Date()}`).catch(() => {
        return;
    });
};

module.exports = {
    send,
};
