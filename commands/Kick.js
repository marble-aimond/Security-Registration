const Discord = require("discord.js");
const errors = require("./errors");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("KICK_MEMBERS")) return errors.noPerms(message, "KICK_MEMBERS");
    if(args[0] == "help"){
        message.reply("Usage: !kick <user> <reason>");
      return;
    }
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return errors.cantfindUser(message.channel);
    let kReason = args.join(" ").slice(22);
    if(kUser.hasPermission("MANAGE_MESSAGES")) return errors.equalPerms(message, kUser, "MANAGE_MESSAGES");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Tiime", message.createdAt)
    .addField("Reason", kReason);

    let kickChannel = message.guild.channels.find(`name`, "kblogs");
    if(!kickChannel) return message.channel.send("Can't find kblogs channel.");
    
    message.channel.bulkDelete(1);
    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    let msgembed = new Discord.RichEmbed()
    .setDescription("~User Removed From Server~")
    .setColor("#bc0000")
    .addField("User Kicked", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .setImage("https://media3.giphy.com/media/13OUTTY6cLeJQQ/200.gif")
    .setFooter("Your Welcome")
    .setFooter("No Need to Thank Me", "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Emoji_u1f44c.svg/2000px-Emoji_u1f44c.svg.png")

    message.channel.send(msgembed);
}

module.exports.help = {
  name:"kick"
}
module.exports.help = {
        name: "kick"
}