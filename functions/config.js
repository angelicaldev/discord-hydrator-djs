const config = require('../config/config.json');
const functions = require('./');

/**
 * Checks the config.json file to make sure i0t is set up correctly, if anything is incorrectly configured it will throw an error.
 */
const check = () => {
    // Advanced logging is enabled - this will enable events from ratelimit, warn and info
    if (config.setup.enableDebugLogs) console.log('\nAdvanced Debug Mode is enabled in the configuration.\n');
    // No taken has been specified in the env file
    if (!process.env.TOKEN) functions.omit.error(`You have not specified a bot authentication token, please do this.`, 0);
    // There is no guild defined in the configuration
    if (!config.setup.guildID) return functions.omit.error('No guild has been defined in the configuration, please set this.', 0);
    // There is no channel defined in the configuration
    if (!config.setup.channelID) return functions.omit.error('No channel has been defined in the configuration, please set this.', 0);
    // There is no role defined in the configuration
    if (!config.setup.roleID) return functions.omit.error('No role has been defined in the configuration, please set this.', 0);
    // There is no interval set in the configuration
    if (!config.message.intervalInSeconds) return functions.omit.error('You have not specified an interval to send the message at', 0);
    // There is no admin role configured
    if (!config.setup.adminRoleID) return functions.omit.error('You have not specified an admin role, please do this.', 0);
    // There is no message set and there is also no embed being sent either
    if (!config.message.plainMessage && !config.message.useEmbeds) return functions.omit.error('You have not specified a message to send and embeds are disabled.', 1);
    // You have not specified any content for the embed to contain
    if (config.message.useEmbeds && !config.message.embedTitle && !config.message.embedDescription && !config.message.embedFooter && !config.message.embedImage && !config.message.embedTimestamp)
        return functions.emit.error('You have not specified any content for the embed to send and you have set useEmbeds to true');
};

module.exports = {
    check,
};
