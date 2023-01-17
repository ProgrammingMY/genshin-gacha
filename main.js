require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGES", "GUILD_MEMBERS"] });

client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.utilities = new Discord.Collection();
client.PREFIX = '!';
client.PAIMON_REPLY = [`EHE TE NANDAYO!?`, `EHE KEPALA BAPAK KAU!?`, {files: ["https://media.discordapp.net/attachments/852519458760294400/877514791378382948/image0.jpg"]}];

['command_handler', 'event_handler', 'utility_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord);
})

// get banner info
var filter_array = client.utilities.get('filter_array');
filter_array(client);

// daily login at 1.00AM
// check time every minute
setInterval(function() {
    let date_ob = new Date();
    if (date_ob.getHours() == 1 && date_ob.getMinutes() == 0){
        var daily_login = client.utilities.get('daily_login');
        daily_login(client);
    }
}, 60 * 1000);

client.login(process.env.DISCORD_KEY);
