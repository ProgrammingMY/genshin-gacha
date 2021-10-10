const Discord = require('discord.js');
const fs = require('fs');

function select(list) {
    var item = list[Math.floor(Math.random() * list.length)];
    return item;
}

module.exports = {
    name: 'pull',
    description: '\'!pull s/w/c\', 10 pulls on s - standard, w - weapon, c - character',
    async execute(client, message, args) {
        const load_database = client.utilities.get('load_database');
        const save_database = client.utilities.get('save_database');
        var banner = '';
        //load database
        var traveller = load_database(message, true);
        if (!traveller) return message.channel.send('You havent register the adventure');

        // seperate args
        switch(args[0]) {
        case 'c': banner = 'character';
        break;
        case 'w': banner = 'weapon';
        break;
        case 's': banner = 'standard';
        break;
        default: return message.channel.send(`Please select a banner. \`!pull c/w/s\``);
        }
        var rigged = args[1];
        var items = '';
        var color = 'BA55D3';

        var get_gacha_rate = client.utilities.get('get_gacha_rate');

        // get featured banner
        var featured_database = "./database/featured_banner.json";
        let rawdata = fs.readFileSync(featured_database);
        var featured = JSON.parse(rawdata);

        // message in embed
        var title = `${message.author.username} pulls`;

        var result_embed = new Discord.MessageEmbed()
        .setTitle(title)
        .setColor(color)

        await message.channel.send({embeds: [result_embed]}).then(message => {
            result_msg = message;
        });

        // 10 pulls
        for (var pull = 1; pull <=10; pull++) {
            traveller.pulls += 1;
            // get gacha rate based on current pity
            [chance_4, chance_5] = get_gacha_rate(traveller, banner, rigged);

            // let's roll!
            var roll = Math.random();

            // get a 5 star
            if (roll < chance_5) {
                traveller[banner].pity_4 += 1;
                traveller[banner].pity_5 = 0;
                traveller.amount_5 += 1;
                color = 'FFD700';
                var star = 5;
                let roll = Math.random();
                // if standard banner
                if (banner == 'standard') var item = select(client.characters_5.concat(client.weapons_5));
                // if character banner
                else if (banner == 'character') {
                    if (traveller[banner].featured_5 == true || roll < 0.5) {
                        traveller[banner].featured_5 = false;
                        var item = select(featured.char_5star);
                        
                    } else {
                        traveller[banner].featured_5 = true;
                        var item = select(client.characters_5);
                    }
                // if weapon banner
                } else {
                    if (traveller[banner].featured_5 == true || roll < 0.75) {
                        traveller[banner].featured_5 = false;
                        var item = select(featured.weapon_5star);  
                    } else {
                        traveller[banner].featured_5 = true;
                        var item = select(client.weapons_5);
                    }
                }
            }
            // get a 4 star
            else if (roll < (chance_5 + chance_4)) {
                traveller[banner].pity_4 = 0;
                traveller[banner].pity_5 += 1;
                traveller.amount_4 += 1;
                var star = 4;
                let roll = Math.random();
                // combine 4 star items with 4 star standard characters
                if (banner == 'standard') var item = select(client.items_4.concat(client.items_standard));
                // if character banner
                else if (banner == 'character'){
                    if (traveller[banner].featured_4 == true || roll < 0.5) {
                        traveller[banner].featured_4 = false;
                        var item = select(featured.char_4star);
                    } else {
                        traveller[banner].featured_4 = true;
                        var item = select(client.items_4);
                    }  
                // if weapon banner  
                } else {
                    if (traveller[banner].featured_4 == true || roll < 0.75) {
                        traveller[banner].featured_4 = false;
                        var item = select(featured.weapon_4star);
                    } else {
                        traveller[banner].featured_4 = true;
                        var item = select(client.items_4);
                    }
                }
                 
            }
            // get a 3 star
            else {
                traveller[banner].pity_4 += 1;
                traveller[banner].pity_5 += 1;
                var star = 3;
                var item = select(client.items_3);
            }

            // append all items got for each pull
            items += `\n[${star}★] ${item}`;

            // display items for each 2 pulls
            if (pull % 2 == 0) {
                let new_embed = new Discord.MessageEmbed()
                .setTitle(title)
                .setColor(color)
                .setDescription(items)
                result_msg.edit({embeds: [new_embed]});
            }
        }

        // save the latest traveller pulls data
        save_database(message, traveller);
    }
}