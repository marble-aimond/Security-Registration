const Discord = require('discord.js');
const send = require("quick.hook");

module.exports.run = async (bot, message, args) => {
    
    const embed = new Discord.RichEmbed()
        .setColor("#5897fc")
        .setTitle("Admin Commands")
        .setFooter("Commands are Subject to Change ||> Private Server <||")
        .setThumbnail("https://www.mheducation.com/content/dam/mhe/corporate/contact/tech-support-purple.jpg")
        .addField("Ban User:", "```\n!ban <user> <reason>```",)
        .addField("Ban List:", "```\n!blist```")
        .addField("Clear/Purge:", "```\n!clear <Number of Messages>```")
        .addField("Kick User:", "```\n!kick <user> <reason>```")
        .addField("Remove User Role:", "```\n!removerole <user> <role>```")
        .addField("Disclaimer:", "```\nThis Bot is not a Google Support Bot, We will never be Google```")
    send(message.channel, embed, {
        name: 'Customer Support',
        icon: 'https://i.imgur.com/OXS68pa.png'
    });
};

module.exports.help = {
    name: "adminhelp"
}