const Discord = require('discord.js');
require('dotenv').config();
var BotGacha = require('./gacha.js');
var utils = require('./utility.js');

const bot = new Discord.Client();
const token = process.env.DISCORD_KEY; 
const PREFIX = '!';

var botgacha = new BotGacha;

const paimon_reply = [`EHE TE NANDAYO!?`, `EHE KEPALA BAPAK KAU!?`]

bot.on('ready', () => {
    bot.user.setActivity('!help to get started');
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
            botgacha.multi_pull(message, message.author, args[1]);
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
            utils.get_max_resin_time(message, args[1], args[2]);
        break; 

        case 'abyss':
            utils.get_abyss_reset(message);
        break;

    }
})

bot.login(token);