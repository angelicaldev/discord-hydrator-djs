const message = require('../core/config/message.json');
const { MessageEmbed } = require('discord.js');

const build = () => {
    let embed = new MessageEmbed();
    if (message.embedTitle) embed.setTitle(message.embedTitle);
    if (message.embedDescription) embed.setDescription(message.embedDescription);
    if (message.embedFooter) embed.setFooter(message.embedFooter);
    if (message.embedThumbnail) embed.setThumbnail(message.embedThumbnail);
    if (message.embedImage) embed.setImage(message.embedImage);
    if (message.embedTimestamp) embed.setTimestamp(new Date());
    if (message.embedColour) embed.setColor(message.embedColour);
    return embed;
};

module.exports = {
    build,
};
