const config = require('./config.json');
const Discord = require('discord.js');
const Stevetron = new Discord.Client();

Stevetron.on('ready', () => {
    console.log('Stevetron is online!');
    Stevetron.user.setActivity('Dota 2');
});

Stevetron.on('message', async message => {
    if (message.author.bot) { return };
    let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    if (message.member.roles.some(r => ['Little Boi'].includes(r.name))) {
        // Delete Brendan's YouTube Links
        if (message.content.toLowerCase().replace(/[^a-zA-Z]/g, '').includes('youtube')) {
            message.delete();
        }
        // Delete Brendan's Twitch Links
        if (message.content.toLowerCase().replace(/[^a-zA-Z]/g, '').includes('twitch')) {
            message.delete();
        }
    }

    if (message.content.includes(config.prefix)) {
        // Bot Information
        if (cmd === 'help') {
            return message.channel.send('lmao ur on ur own buddy');
        }

        // Request Role
        if (cmd == 'setrole') {
            if (message.member.roles.some(r => ['Little Boi'].includes(r.name)) &&
            args[0].toLowerCase().replace(/[^a-zA-Z]/g, "").includes('admin')) {
                return message.channel.send('lmao no way brendino');
            }

            if (args.length != 2) { return message.channel.send(message.author + ' `ERROR: CHECK THE STEVETRON-GUIDE CHANNEL FOR PROPER SYNTAX`'); }
            message.channel.send(message.author + ' `Thanks, your request has been received and will be processed soon.`');
            return Stevetron.channels.get('460120201896394753').send(message.author + ' requested the role `' + args[0] + '` and the color `' + args[1] + '`');
        }

        // Make Stevetron Talk (Exclude Brendan)
        if (cmd === 'say') {
            if (message.member.roles.some(r => ['Little Boi'].includes(r.name))) {
                return message.channel.send("what makes you think i'd let you use this brendan");
            }

            let sayMessage = args.join(' ');
            message.delete();
            return message.channel.send(sayMessage);
        }

        // Random Number
        if (cmd === 'roll') {
            if (args.length == 0) { return message.channel.send(message.author + ' `ERROR: SELECT A NUMBER`'); }
            if (args[0] % 1 != 0) { return message.channel.send(message.author + ' `ERROR: INTEGERS ONLY`'); }
            let num = parseInt(args[0]);

            if (parseInt(args[0]) <= 0) {
                return message.channel.send(message.author + ' `ERROR: NUMBER MUST BE > 0`');
            }
            else {    
                let roll = Math.floor(Math.random() * parseInt(args[0])) + 1;
                return message.channel.send(message.author + ' `you rolled a ' + roll + '`');
            }
        }

        // Choose Option
        if (cmd === 'choose') {
            if (args.length < 1) { return message.channel.send(message.author + ' `ERROR: NEED AT LEAST 2 OPTIONS`'); }
            let roll = Math.floor(Math.random() * args.length);
            return message.channel.send('<:knowledgeispower:456417600751009793> `' + args[roll] + '`<:knowledgeispower:456417600751009793>');
        }

        // UR NOT FUNNY
        if (cmd === 'urnotfunny') {
            return message.channel.send('.       <:goodevening:444723621621923851>  < (UR NOT FUNNY)\n:muscle: :shirt: :punch:\n        <:brenballs:442955197451337728>\n       :mans_shoe::mans_shoe:');
        }




        // Else Random Message
        const errorMessages = [
            "leave me alone", "leave me alone", "leave me alone", "leave me alone", "leave me alone",
            "stop talking to me", "stop talking to me", "stop talking to me",
            "im too busy deleting brendans posts to reply"
        ];

        let roll = Math.floor(Math.random() * errorMessages.length);
        return message.channel.send(errorMessages[roll]);
    }
});

Stevetron.login(config.token);

// 绿