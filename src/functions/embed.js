const config = require('../core/config/config.json');
const { MessageEmbed } = require('discord.js');

const build = () => {
    let embed = new MessageEmbed();
    if (config.message.embedTitle) embed.setTitle(config.message.embedTitle);
    if (config.message.embedDescription) embed.setDescription(config.message.embedDescription);
    if (config.message.embedFooter) embed.setFooter(config.message.embedFooter);
    if (config.message.embedThumbnail) embed.setThumbnail(config.message.embedThumbnail);
    if (config.message.embedImage) embed.setImage(config.message.embedImage);
    if (config.message.embedTimestamp) embed.setTimestamp(new Date());
    if (config.message.embedColour) embed.setColor(config.message.embedColour);
    return embed;
};

module.exports = {
    build,
};
