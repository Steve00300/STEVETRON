const config = require('./config.json');
const Discord = require('discord.js');
const Stevetron = new Discord.Client();

Stevetron.on('ready', () => {
    console.log('--------------------------\n   Stevetron Activated\n--------------------------');
    console.log('> Bot Status: Invisible');
    Stevetron.user.setStatus('invisible');
    Stevetron.user.setActivity("Brendan's Posts", {type: 'Watching'});
});

Stevetron.on('message', async message => {
    if (message.author.bot) {return};
    let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    // Delete Messages if Muted
    if (message.member.roles.some(r => ['MUTED'].includes(r.name))) {
        console.log('> Message Deleted: [' + message.member.nickname + '] ' + message);
        return message.delete();
    }

    // Delete Brendan's YouTube Links
    if (message.member.roles.some(r => ['Bwrundo'].includes(r.name))) {
        if (message.content.toLowerCase().replace(/[^a-zA-Z]/g, '').includes('youtube')) {
            // Stop Duplicate Messages
            if (message.member.roles.some(r => ['MUTED'].includes(r.name))) {return;}
            console.log('> Bot Status: Online\n> Mute Triggered: [' + message.author.username + '] ' + message);
            message.delete();
            message.member.addRole('461834637254328331');
            Stevetron.user.setStatus('online');
            return message.channel.send(message.author + ' `GUESS WHAT I WAS ONLINE THE WHOLE TIME FAGGOT GET MUTED`');
        }
    }

    if (message.content.includes(config.prefix)) {
    // Request Role
        if (cmd === 'setrole') {
            if (message.member.roles.some(r => ['Bwrundo'].includes(r.name)) && args[0].toLowerCase().replace(/[^a-zA-Z]/g, "").includes('admin')) {
                return message.channel.send('`lmao no way brendino`');
            }
            if (args.length != 2) {
                return message.channel.send(message.author + ' `ERROR: CHECK THE STEVETRON-GUIDE CHANNEL FOR PROPER SYNTAX`');
            }
            message.channel.send(message.author + ' `Thanks, your request has been received and will be processed soon.`');
            return Stevetron.channels.get('443393366051258397').send(message.author + ' requested the role `' + args[0] + '` and the color `' + args[1] + '`');
        }

    // Bot Information
        if (cmd === 'help') {
            return message.channel.send('`lmao ur on ur own buddy`');
        }

    // Make Stevetron Talk
        if (cmd === 'say') {
            // in your dreams bernard
            if (message.member.roles.some(r => ['Lonely Boi'].includes(r.name))) {
                return message.channel.send('`no`');
            }
            let sayMessage = args.join(' ');
            console.log('> Stevetron Say: [' + message.member.nickname + '] ' + sayMessage);
            message.delete();
            return message.channel.send(sayMessage);
        }

    // Make Stevetron Message Channel (Admin Only)
        if (cmd === 'message') {
            if (!message.member.roles.some(r => ['绿'].includes(r.name))) {
                return message.channel.send(message.author + ' `ERROR: YOU DO NOT HAVE PERMISSION TO USE THIS COMMAND`');
            }
            if (parseInt(args[0]) < 0 || parseInt(args[0]) > 4) {
                return message.channel.send(message.author + ' `ERROR: INVALID CHANNEL`');
            }
            // [stevetronguide, stevechat, codemonkeys, antonianrepublic, spacesilkroad]
            const channel = ['460044314022510612', '439233768130347010', '458520271360622592', '443367636701544458', '459619723852644384'];
            let sayMessage = args.slice(1).join(' ');
            return Stevetron.channels.get(channel[args[0]]).send(sayMessage);
        }

    // Mute
        if (cmd === 'mute') {
            let roll = Math.floor(Math.random() * 2);
            let muteID = args[0].replace(/\D+/g, '');
            let muteTarget = message.guild.members.get(muteID);
            if (muteTarget === undefined) {return message.channel.send(message.author + ' `ERROR: INVALID USER`');}

            // nice try
            if (muteID === '459004770108047380') {
                message.member.addRole('461834637254328331');
                return message.channel.send(message.author + ' `haha very funny get rekt prick`');
            }

            // also nice try
            if (message.member.roles.some(r => ['Bwrundo'].includes(r.name)) || muteID === '182146500732649472') {roll = 0;}

            // actually nice try
            if (message.member.roles.some(r => ['绿'].includes(r.name))) {roll = 1;}
            if (message.member.roles.some(r => ['Dicktator'].includes(r.name))) {roll = 1;}

            // good roll
            if (roll === 1) {
                muteTarget.addRole('461834637254328331');
                return message.channel.send(message.author + ' `THANKS, [' + muteTarget.nickname + '] HAS BEEN MUTED`');
            }

            // else get rekt
            message.member.addRole('461834637254328331');
            return message.channel.send(message.author + ' `OPPS, YOU GOT UNLUCKY AND MUTED YOURSELF INSTEAD`');
        }

    // Unmute
    if (cmd === 'unmute') {
        let unmuteID = args[0].replace(/\D+/g, '');
        let unmuteTarget = message.guild.members.get(unmuteID);
        if (unmuteTarget === undefined) {return message.channel.send(message.author + ' `ERROR: INVALID USER`');}
        unmuteTarget.removeRole('461834637254328331');
        return message.channel.send(message.author + ' `THANKS, [' + unmuteTarget.nickname + '] HAS BEEN UNMUTED`');
    }

    // Change Nickname
    if (cmd === 'nickname') {
        let nickID = args[0].replace(/\D+/g, '');
        let nickTarget = message.guild.members.get(nickID);
        if (nickTarget === undefined) {return message.channel.send(message.author + ' `ERROR: INVALID USER`');}
        if (message.member.roles.some(r => ['Lonely Boi'].includes(r.name))) {
            return message.channel.send('`no`');
        }
        let nickname = args.join(' ');
        nickTarget.setNickname(nickname);
        return
    }

    // Random Number
        if (cmd === 'roll') {
            if (args.length == 0) {return message.channel.send(message.author + ' `ERROR: SELECT A NUMBER`');}
            if (args[0] % 1 != 0) {return message.channel.send(message.author + ' `ERROR: INTEGERS ONLY`');}
            if (parseInt(args[0]) <= 0) {return message.channel.send(message.author + ' `ERROR: NUMBER MUST BE > 0`');}
            let roll = Math.floor(Math.random() * parseInt(args[0])) + 1;
            return message.channel.send(message.author + ' `You rolled a ' + roll + '`');
        }

    // Choose Option
        if (cmd === 'choose') {
            if (args.length < 1) {return message.channel.send(message.author + ' `ERROR: NEED AT LEAST 2 OPTIONS`');}
            let roll = Math.floor(Math.random() * args.length);
            return message.channel.send('<:knowledgeispower:456417600751009793> `' + args[roll] + '`<:knowledgeispower:456417600751009793>');
        }

    // UR NOT FUNNY
        if (cmd === 'urnotfunny') {
            return message.channel.send('.       <:goodevening:444723621621923851>  < (UR NOT FUNNY)\n:muscle: :shirt: :punch:\n        <:brenballs:442955197451337728>\n       :mans_shoe::mans_shoe:');
        }

    // Longdan
        if (cmd === 'longdan') {
            return message.channel.send('<:forbidden_thighs:465692384169033738><:forbidden_pelvis:465692385834303498><:forbidden_head:465692386216116225>');
        }

    }
});

Stevetron.login(config.token);