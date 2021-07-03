const Discord = require('discord.js');
require('dotenv').config();
const BotGacha = require('./gacha.js');
const utils = require('./utility.js');

// to run python script (auto login feature)
const {spawn} = require('child_process');
const login_time = [1, 0];
var login_channel;

function auto_login(){
    var dataToSend;
    // spawn new child process to call the python script
    const python = spawn('python3', ['./auto-login/genshin-os.py']);
    // collect data from script
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
        var embedmsg = new Discord.MessageEmbed()
            .setDescription(dataToSend);
        login_channel.send(embedmsg);
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    });
}

// check time every minute
setInterval(function() {
    let date_ob = new Date();
    if (date_ob.getHours() == login_time[0] && date_ob.getMinutes() == login_time[1]){
        auto_login();
    }
}, 60 * 1000) //check every minute

const bot = new Discord.Client();
const token = process.env.DISCORD_KEY; 
const PREFIX = '!';

var botgacha = new BotGacha;

const paimon_reply = [`EHE TE NANDAYO!?`, `EHE KEPALA BAPAK KAU!?`]

bot.on('ready', () => {
    bot.user.setActivity('!help to get started');
    login_channel = bot.channels.cache.get('804284465534861312'); // Channel to send notification
    console.log('gachabot is online!');
});

bot.on('message', async message => {
    if (message.content.match(/\behe\b/)) {
        var reply = paimon_reply[Math.floor(Math.random() * paimon_reply.length)];
        message.channel.send(reply);
    }


    if(!message.content.startsWith(PREFIX) || message.author.bot) return;  

    const args = message.content.slice(PREFIX.length).split(/ +/);

    switch(args[0]) {

        case 'pull':
            botgacha.multi_pull(message, args[1], args[2]);
        break;

        case 'register':
            botgacha.player_join(message, message.author);
        break;

        case 'setpity':
            if (!args[1]) return message.channel.send(`Invalid input!`);
            botgacha.set_pity(message, message.author, args[1], args[2]);
        break;

        case 'summ':
            botgacha.get_pity(message, message.author);
        break;

        case 'reset':
            botgacha.reset_pity(message);
        break;

        case 'help':
            utils.get_help(message);
        break;

        case 'resin':
            if (!args[1]) return message.channel.send(`Invalid input!`);
            utils.get_max_resin_time(message, args[1], args[2], args[3]);
        break; 

        case 'abyss':
            utils.get_abyss_reset(message);
        break;

        case 'admin':
            if (message.author.id != "466594885844336651") return message.channel.send("Only Aki Kun can use this command");
            if (!args[2]) return message.channel.send(`The command is !admin <command> <banner> <item>`);
            var keyword = message.content.substring(PREFIX.length + args[0].length + args[1].length + args[2].length + 3);
            utils.change_banner(message, args[1], args[2], keyword);
        break;

        case 'login':
		auto_login();
	break;

    }
})

bot.login(token);
