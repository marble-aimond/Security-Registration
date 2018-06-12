const Discord = require("discord.js");
const errors = require("./errors");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MUTE_MEMBERS")) return errors.noPerms(message, "MUTE_MEMBERS");
    if(args[0] == "help"){
        message.reply("Usage: !warn <user> <reason>");
      return;
    }
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return errors.cantfindUser(message.channel);
    let kReason = args.join(" ").slice(22);
    if(!kReason) return errors.noReason(message.channel);
    if(kUser.hasPermission("MANAGE_MESSAGES")) return errors.equalPerms(message, kUser, "MANAGE_MESSAGES");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Warned User~")
    .setColor("#e56b00")
    .addField("Warned User", `${kUser} with ID ${kUser.id}`)
    .addField("Warned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Warned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", kReason);

    let kickChannel = message.guild.channels.find(`name`, "kblogs");
    if(!kickChannel) return message.channel.send("Can't find kblogs channel.");

    message.channel.bulkDelete(1);
    kickChannel.send(kickEmbed);
    message.channel.send(`${kUser} you have Been Warned`);
  
    let msgembed = new Discord.RichEmbed()
    .setDescription("~Warned User~")
    .setColor("#e56b00")
    .addField("Warned User", `${kUser} with ID ${kUser.id}`)
    .addField("Warned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Time", message.createdAt)
    .addField("Reason", kReason)
    .setImage("https://media1.tenor.com/images/adb9c5362d7df68690ad39014189b334/tenor.gif");

    message.channel.send(msgembed);
};

module.exports.help = {
  name:"warn"
}
module.exports.help = {
        name: "warn"
}