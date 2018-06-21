const config = require('./config.json');
const Discord = require('discord.js');
const Stevetron = new Discord.Client();

Stevetron.on('ready', () => {
    console.log('Stevetron is online!');
    //Stevetron.user.setActivity('');
});

Stevetron.on('message', async message => {
    if (message.author.bot) return;
    let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    if (message.member.roles.some(r => ["Little Boi"].includes(r.name))) {
        // Delete Brendan's YouTube Links
        if (message.content.toLowerCase().replace(/[^a-zA-Z]/g, "").includes('youtube')) {
            message.delete();
        }
    }

    if (message.content.includes(config.prefix)) {
        // Bot Information
        if (cmd === 'help') {
            return message.channel.send("lmao ur on ur own buddy");
        }

        // Make Stevetron Talk
        else if (cmd === 'say') {
            if (!message.member.roles.some(r => ["绿"].includes(r.name)))
            return message.channel.send("nice try");

            let sayMessage = args.join(" ");
            message.delete();
            return message.channel.send(sayMessage);
        }

        // Random Number
        else if (cmd === 'roll') {
            let roll = Math.floor(Math.random() * 10) + 1;
            return message.reply("you rolled a " + roll);
        }

        // Else Random Message
        else {
            const errorMessages = [
                "leave me alone", "leave me alone", "leave me alone",
                "stop talking to me", "stop talking to me", "stop talking to me",
                "im too busy deleting brendans posts to reply"
            ];

            let roll = Math.floor(Math.random() * errorMessages.length);
            return message.channel.send(errorMessages[roll]);
        }
    }
});

Stevetron.login(config.token);