const config = require('./config.json');
const Discord = require('discord.js');
const Stevetron = new Discord.Client();

Stevetron.on('ready', () => {
    console.log('-------------------------\nStevetron is online!\n-------------------------');
    console.log('> Status Set: Invisible');
    Stevetron.user.setStatus('invisible');
    Stevetron.user.setActivity("Brendan's Posts", {type: 'Watching'});
});

Stevetron.on('message', async message => {
    if (message.author.bot) { return };
    let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    // Delete Messages if Muted
    if (message.member.roles.some(r => ['MUTED'].includes(r.name))) {
        message.delete();
        console.log('Message Deleted : ' + message);
    }

    // Delete Brendan's YouTube Links
    if (message.member.roles.some(r => ['Little Boi', '绿'].includes(r.name))) {
        if (message.content.toLowerCase().replace(/[^a-zA-Z]/g, '').includes('youtube')) {
            // Stop Duplicate Messages
            if (message.member.roles.some(r => ['MUTED'].includes(r.name))) { return;}
            // -----------------------
            console.log('> Status Set: Online\nMute Triggered : ' + message);
            message.delete();
            message.member.addRole('461834637254328331');
            Stevetron.user.setStatus('online');
            Stevetron.channels.get('439233768130347010').send(message.author + ' GUESS WHAT I WAS ONLINE THE WHOLE TIME FAGGOT GET MUTED');
            return Stevetron.channels.get('443367636701544458').send(message.author + ' GUESS WHAT I WAS ONLINE THE WHOLE TIME FAGGOT GET MUTED');
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
            return Stevetron.channels.get('443393366051258397').send(message.author + ' requested the role `' + args[0] + '` and the color `' + args[1] + '`');
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

        // Make Stevetron Talk In Specific Channel (Admin Only)
        if (cmd === 'message') {
            if (!message.member.roles.some(r => ['绿'].includes(r.name))) {
                return message.channel.send(message.author + ' `ERROR: YOU DO NOT HAVE PERMISSION TO USE THIS COMMAND`');
            }
            // [stevetronguide, stevechat, codemonkeys, antonianrepublic]
            const channel = ['460044314022510612', '439233768130347010', '458520271360622592', '443367636701544458'];
            let sayMessage = args.slice(1).join(' ');
            return Stevetron.channels.get(channel[args[0]]).send(sayMessage);
        }

        // Mute Brendan
        if (cmd === 'mute') {
            let brendino = message.guild.members.get('247619293599105025');
            brendino.addRole('461834637254328331');
            return message.channel.send(message.author + ' `THANKS, BRENDAN HAS BEEN MUTED`');
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

    }
});

Stevetron.login(config.token);