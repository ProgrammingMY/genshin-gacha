const { defaultCipherList } = require('constants');
const Discord = require('discord.js');
const fs = require('fs');

// get abyss time
var today = new Date();
var abyss1 = new Date(today.getFullYear(), today.getMonth() + 1, 1, 4, 0, 0);
var abyss2 = new Date(today.getFullYear(), today.getMonth(), 16, 4, 0, 0);

var one_day = 1000*60*60*24;

function get_remaining_time (message, start, end) {
    // calculate the remaining time in days, hours, minutes
    let remaining = (end.getTime()-start.getTime()) / one_day;
    let days = Math.floor(remaining);
    let hours = (remaining - days) * 24;
    let minutes = Math.ceil((hours - Math.floor(hours)) * 60);
    hours = Math.floor(hours);

    message.channel.send(`Abyss will reset in ` + days + ` days ` + hours + ` hours ` + minutes + ` minutes`);
}

function get_array_from_item (item) {
    var item_list = item.split(",");

    return item_list;
}

function change_banner (message, command, banner, item) {
    //show, add
    var featured_database = "./database/Featured_banner.json";

    let rawdata = fs.readFileSync('./database/Featured_banner.json');
    const featured = JSON.parse(rawdata);

    if (command == 'add') {
        if (!item) return message.channel.send("Incorrect input!");
        var item_list = get_array_from_item(item);
        switch (banner) {
            case '4char':
                featured.char_4star = item_list;
            break;

            case '5char':
                featured.char_5star = item_list;
            break;

            case '4weap':
                featured.weapon_4star = item_list;
            break;

            case '5weap':
                featured.weapon_5star = item_list;
            break;

            default:
                return message.channel.send("Incorrect input!");
        }
    } else if (command == 'show') {
        switch (banner) {
            case '4char':
                return message.channel.send(featured.char_4star);

            case '5char':
                return message.channel.send(featured.char_5star);

            case '4weap':
                return message.channel.send(featured.weapon_4star);

            case '5weap':
                return message.channel.send(featured.weapon_5star);

            default:
                return message.channel.send("Incorrect input!");
        }
    }

    // save the database
    let data = JSON.stringify(featured, null, 2);
    fs.writeFileSync(featured_database, data);

    message.channel.send("Banner has been updated!");
}

module.exports = {
    get_max_resin_time: function (message, resin, final_resin = 160) {
        // get current time
        var today = new Date();

        if (isNaN(resin) || resin < 0) return message.channel.send(`Invalid input!`);

        // calculate remaining time to max out resin
        let max_resin = (Number(final_resin) - Number(resin)) * 8;
        if (max_resin <= 0) return message.channel.send(`Your resin is already reached the desired amount!`);

        let in_hour = Math.floor(max_resin / 60);
        let in_minute = max_resin % 60;
        let minutes = today.getMinutes() + in_minute;
        let hours = today.getHours() + Math.floor(minutes/60) + in_hour;

        // if more than 60 minutes
        var day = 'today';
        if (minutes > 59) minutes -= 60;
        if (hours > 23) {
            day = 'tomorrow';
            hours -= 24;
        }
        
        // HH:MM format
        hours = ("0" + hours).slice(-2);
        minutes = ("0" + minutes).slice(-2);

        message.channel.send(`Your resin will reach ${final_resin} at **` + hours + `:` + minutes + ` ${day}**`);
    },

    get_abyss_reset: function (message) {
        // get current time
        var today = new Date();

        // first week
        if (today.getDate() <= abyss2.getDate()) {
            get_remaining_time(message, today, abyss2);

        // second week
        }else {
            get_remaining_time(message, today, abyss1);
        }
        
    },

    get_help: function (message) {
        fs.readFile('database/help.txt', 'utf8', function(err, data) {
            if (err) throw err;

            let helpEmbed = new Discord.MessageEmbed()
            .setTitle('Paimon bot help')
            .setDescription(data);

            message.channel.send(helpEmbed);
        });
    },

    change_banner: function (message, command, banner, item) {
        change_banner (message, command, banner, item);
    }
};