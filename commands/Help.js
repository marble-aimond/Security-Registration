const Discord = require('discord.js');
const send = require("quick.hook");

module.exports.run = async (bot, message, args) => {
    
    const embed = new Discord.RichEmbed()
        .setColor("#5897fc")
        .setTitle("Commands")
        .setFooter("Commands are Subject to Change ||> Private Server <||")
        .setThumbnail("https://www.mheducation.com/content/dam/mhe/corporate/contact/tech-support-purple.jpg")
        .addField("Customer Commands", "```\n!report <user> <reason>```",)
        .addField("...", "```\n!serverinfo```")
        .addField("Server Custom CMD", "```\n!botinfo```")
        .addField("Disclaimer:", "```\nThis Bot is not a Google Support Bot, We will never be Google```")
    send(message.channel, embed, {
        name: 'Customer Support',
        icon: 'https://i.imgur.com/OXS68pa.png'
    });
};

module.exports.help = {
    name: "help"
}