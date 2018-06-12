const Discord = require('discord.js');
const errors = require("./errors");



module.exports.run = async (bot, message, args) => {
    message.delete();
    if(!message.member.hasPermission("BAN_MEMBERS")) return errors.noPerms(message, "BAN_MEMBERS");
    if(args[0] == "help"){
      message.reply("Usage: !ban <user> <reason>");
      return;
    }
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return errors.cantfindUser(message.channel);
    if(bUser.id === bot.user.id) return errors.botuser(message); 
    let bReason = args.join(" ").slice(22);
    if(!bReason) return errors.noReason(message.channel);
    if(bUser.hasPermission("MANAGE_MESSAGES")) return errors.equalPerms(message, bUser, "MANAGE_MESSAGES");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "kblogs");
    if(!incidentchannel) return message.channel.send("Can't find kblogs channel.");

    message.channel.bulkDelete(1);
    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);

    let msgembed = new Discord.RichEmbed()
    .setDescription("~User Banned~")
    .setColor("#bc0000")
    .addField("User Banned", `${bUser} with ID ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .setImage("https://i.imgur.com/O3DHIA5.gif")
    .setFooter("Your Welcome")
    .setFooter("No Need to Thank Me", "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Emoji_u1f44c.svg/2000px-Emoji_u1f44c.svg.png")

    message.channel.send(msgembed);
}

module.exports.help = {
  name:"ban"
}