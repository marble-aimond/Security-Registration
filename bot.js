const Discord = require('discord.js');
const botSettings = require("./botsettings.json");
const bot = new Discord.Client({disableEveryone: true});
const prefix = botSettings.prefix;
const fs = require("fs")
bot.commands = new Discord.Collection();

bot.on("ready", () => {
    console.log(`Bot is Ready!`);
    console.log(bot.commands);
    bot.user.setActivity("With My Code")
    bot.user.setPresence({ status: 'online'});
})

fs.readdir("./commands/", (err, files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
        console.log("No Commands in Command Folder")
        return;
    }

    console.log(`Loading ${jsfiles.length} Commands!`);

    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
          console.log(`${i + 1}: ${f} Loaded!`);
        bot.commands.set(props.help.name, props);
    });
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(prefix)) return;
    
    let cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot, message,args);

    if(command === `${prefix}botinfo`){
        let embed = new Discord.RichEmbed()
            .setAuthor(bot.user.username)
            .setDescription("This Bot is For Private Use only")
            .setTitle("This Bot has Been Custom Made for this Server")
            .setImage("https://i.imgur.com/J2uNVgw.png")
            .setColor("#00fc1d")
        message.channel.sendEmbed(embed);
    }
});

bot.login(process.env.token)
