require('dotenv').config();
const message = require('../core/config/message.json');
const functions = require('.');

/**
 * Checks the config.json file to make sure i0t is set up correctly, if anything is incorrectly configured it will throw an error.
 * @returns {void} returns an error if there is a configuration error
 */
const check = () => {
    // Advanced logging is enabled - this will enable events from ratelimit, warn and info
    if (process.env.enableDebugLogs) console.log('\nAdvanced Debug Mode is enabled in the configuration.\n');
    // If the admin role is the same as the optin/optout role, throw an error
    if (process.env.adminRoleID === process.env.roleID) functions.emit.error('Your admin role is the same as your ping role, please change this.');
    // No taken has been specified in the env file
    if (!process.env.TOKEN) functions.emit.error(`You have not specified a bot authentication token, please do this.`, 0);
    // There is no guild defined in the configuration
    if (!process.env.guildID) return functions.emit.error('No guild has been defined in the configuration, please set this.', 0);
    // There is no channel defined in the configuration
    if (!process.env.channelID) return functions.emit.error('No channel has been defined in the configuration, please set this.', 0);
    // There is no role defined in the configuration
    if (!process.env.roleID) return functions.emit.error('No role has been defined in the configuration, please set this.', 0);
    // There is no interval set in the configuration
    if (!message.intervalInSeconds) return functions.emit.error('You have not specified an interval to send the message at', 0);
    // There is no admin role configured
    if (!process.env.adminRoleID) return functions.emit.error('You have not specified an admin role, please do this.', 0);
    // There is no message set and there is also no embed being sent either
    if (!message.plainMessage && !message.useEmbeds) return functions.emit.error('You have not specified a message to send and embeds are disabled.', 1);
    // You have not specified any content for the embed to contain
    if (message.useEmbeds && !message.embedTitle && !message.embedDescription && !message.embedFooter && !message.embedImage && !message.embedTimestamp)
        return functions.emit.error('You have not specified any content for the embed to send and you have set useEmbeds to true');
};

module.exports = {
    check,
};
