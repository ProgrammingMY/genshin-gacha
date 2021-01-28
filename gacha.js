const Discord = require('discord.js');

// get draw pool
const fs = require('fs');
let rawdata = fs.readFileSync('./database/3_star_item.json');
const item_3_star = JSON.parse(rawdata);
rawdata = fs.readFileSync('./database/4_star_item.json');
const item_4_star = JSON.parse(rawdata);
rawdata = fs.readFileSync('./database/5_star_item.json');
const item_5_star = JSON.parse(rawdata);
rawdata = fs.readFileSync('./database/5_star_char.json');
const char_5_star = JSON.parse(rawdata);
rawdata = fs.readFileSync('./database/5_star_weapon.json');
const weapon_5_star = JSON.parse(rawdata);
rawdata = fs.readFileSync('./database/Featured_banner.json');
const featured = JSON.parse(rawdata);

function select(list) {
    var item = list[Math.floor(Math.random() * list.length)];
    return item;
}

function calculate_cost (pulls){
    // cost per 10 pulls assuming already bought for the first time
    const rm_per_primo = 399.9 / 8080;

    return Number((pulls[0] + pulls[1] + pulls[2]) * 160 * rm_per_primo).toFixed(2);
    
}
var result_msg;
function updateEmbed(result) {
    let result_embed = new Discord.MessageEmbed()
    .setTitle(`${result.title} got...`)
    .setColor(result.color)
    .addField('Rarity', result.star, true)
    .addField('Item', result.item, true);

    result_msg.edit({embed: result_embed});
}

class BotGacha {
    constructor () {
        this.players = {};
    }

    player_join(message, user) {
        // [0] is 4 star, [1] is 5 star
        if (!this.players[user.id]) {
            this.players[user.id] = {
                pulls: [0,0,0],
                pity_c: [0,0],
                pity_w: [0,0],
                pity_s: [0,0],
                featured_4: [false,false],
                featured_5: [false,false],
                counter: [0,0],
                item: []
            }
        return message.channel.send(user.username + ` has joined the salt!`);
        } else
        return message.channel.send(`You already joined the salt!`);
        
    }

    /////////////////////////// character banner /////////////////////////////////
    character_banner (message, user, result) {
        if (!this.players[user.id]) return message.channel.send(`Please use !register to join the salt!`);

        // draw rates for character banner simulated from reddit genshin impact
        const RATE_5_1st = 0.006;
        const RATE_5_2nd = 0.015;
        const RATE_5_3rd = 0.3;
        const RATE_4_1st = 0.051;
        const RATE_4_2nd = 0.34;

        const player = this.players[user.id];
        player.pulls[0] += 1;
        var chance_5 = 0;
        var chance_4 = 0;

        // check pity
        if (player.pity_c[0] < 44) chance_5 = RATE_5_1st;
        else if (player.pity_c[0] < 74) chance_5 = RATE_5_2nd;
        else if (player.pity_c[0] < 89) chance_5 = RATE_5_3rd;
        else chance_5 = 1;

        if (player.pity_c[1] < 6) chance_4 = RATE_4_1st;
        else if (player.pity_c[1] < 9) chance_4 = RATE_4_2nd;
        else chance_4 = 1;

        // let's roll!
        var roll = Math.random();

        // get a 5 star
        if (roll < chance_5) {
            player.pity_c[0] = 0;
            player.pity_c[1] += 1;
            player.counter[1] += 1;
            result.color = 'FFD700';
            var star = `★★★★★`;
            let roll = Math.random();
            if (player.featured_5[0] == true || roll < 0.5) {
                player.featured_5[0] = false;
                var item = select(featured.char_5star);  
            } else {
                player.featured_5[0] = true;
                var item = select(char_5_star);
            }
        }

        // get a 4 star
        else if (roll < (chance_5 + chance_4)) {
            player.pity_c[0] += 1;
            player.pity_c[1] = 0;
            player.counter[0] += 1;
            var star = `★★★★`;
            let roll = Math.random();
            if (player.featured_4[0] == true || roll < 0.5) {
                player.featured_4[0] = false;
                var item = select(featured.char_4star);
            } else {
                player.featured_4[0] = true;
                var item = select(item_4_star);
            }     
        }
        
        // get a 3 star
        else {
            player.pity_c[0] += 1;
            player.pity_c[1] += 1;
            var star = `★★★`;
            var item = select(item_3_star);
        }

        result.star += `\n ${star}`;
        result.item += `\n ${item}`;
        updateEmbed(result);
        return result;
    }

    ////////////////////// featured weapon banner ///////////////////////////////
    weapon_banner (message, user, result) {
        if (!this.players[user.id]) return message.channel.send(`Please use !register to join the salt!`);

        // draw rates for character banner simulated from reddit genshin impact
        const RATE_5_1st = 0.007;
        const RATE_5_2nd = 0.0175;
        const RATE_5_3rd = 0.35;
        const RATE_4_1st = 0.06;
        const RATE_4_2nd = 0.4;

        const player = this.players[user.id];
        player.pulls[1] += 1;
        var chance_5 = 0;
        var chance_4 = 0;

        // check pity
        if (player.pity_w[0] < 34) chance_5 = RATE_5_1st;
        else if (player.pity_w[0] < 64) chance_5 = RATE_5_2nd;
        else if (player.pity_w[0] < 79) chance_5 = RATE_5_3rd;
        else chance_5 = 1;

        if (player.pity_w[1] < 6) chance_4 = RATE_4_1st;
        else if (player.pity_w[1] < 9) chance_4 = RATE_4_2nd;
        else chance_4 = 1;

        // let's roll!
        var roll = Math.random();

        // get a 5 star
        if (roll < chance_5) {
            player.pity_w[0] = 0;
            player.pity_w[1] += 1;
            player.counter[1] += 1;
            result.color = 'FFD700';
            var star = `★★★★★`;
            let roll = Math.random();
            if (player.featured_5[1] == true || roll < 0.75) {
                player.featured_5[1] = false;
                var item = select(featured.weapon_5star);  
            } else {
                player.featured_5[1] = true;
                var item = select(weapon_5_star);
            }
        }

        // get a 4 star
        else if (roll < (chance_5 + chance_4)) {
            player.pity_w[0] += 1;
            player.pity_w[1] = 0;
            player.counter[0] += 1;
            var star = `★★★★`;
            let roll = Math.random();
            if (player.featured_4[1] == true || roll < 0.75) {
                player.featured_4[1] = false;
                var item = select(featured.weapon_4star);
            } else {
                player.featured_4[1] = true;
                var item = select(item_4_star);
            }     
        }
        
        // get a 3 star
        else {
            player.pity_w[0] += 1;
            player.pity_w[1] += 1;
            var star = `★★★`;
            var item = select(item_3_star);
        }

        result.star += `\n ${star}`;
        result.item += `\n ${item}`;
        updateEmbed(result);
        return result;
    }

    /////////////////////// standard banner ////////////////////////////
    standard_banner (message, user, result) {
        if (!this.players[user.id]) return message.channel.send(`Please use !register to join the salt!`);

        // draw rates for character banner simulated from reddit genshin impact
        const RATE_5_1st = 0.006;
        const RATE_5_2nd = 0.015;
        const RATE_5_3rd = 0.3;
        const RATE_4_1st = 0.051;
        const RATE_4_2nd = 0.34;

        const player = this.players[user.id];
        player.pulls[2] += 1;
        var chance_5 = 0;
        var chance_4 = 0;

        // check pity
        if (player.pity_s[0] < 44) chance_5 = RATE_5_1st;
        else if (player.pity_s[0] < 74) chance_5 = RATE_5_2nd;
        else if (player.pity_s[0] < 89) chance_5 = RATE_5_3rd;
        else chance_5 = 1;

        if (player.pity_s[1] < 6) chance_4 = RATE_4_1st;
        else if (player.pity_s[1] < 9) chance_4 = RATE_4_2nd;
        else chance_4 = 1;

        // let's roll!
        var roll = Math.random();

        // get a 5 star
        if (roll < chance_5) {
            player.pity_s[0] = 0;
            player.pity_s[1] += 1;
            player.counter[1] += 1;
            result.color = 'FFD700';
            var star = `★★★★★`;
            var item = select(item_5_star);
        }

        // get a 4 star
        else if (roll < (chance_5 + chance_4)) {
            player.pity_s[0] += 1;
            player.pity_s[1] = 0;
            player.counter[0] += 1;
            var star = `★★★★`;
            var item = select(item_4_star);  
        }
        
        // get a 3 star
        else {
            player.pity_s[0] += 1;
            player.pity_s[1] += 1;
            var star = `★★★`;
            var item = select(item_3_star);
        }

        result.star += `\n ${star}`;
        result.item += `\n ${item}`;
        updateEmbed(result);
        return result;
    }

    async multi_pull (message, user, banner) {
        if (!this.players[user.id]) return message.channel.send(`Please use !register to join the salt!`);
        if (!banner) return message.channel.send(`Please select a banner`);


        // create an embed
        var result_embed = {
            color: 0x0099ff,
            title: 'Waiting in line....',
        };

        // create a list of item got
        var result = {
            title: user.username,
            color:'BA55D3',
            star: ``,
            item: ``
        };

        await message.channel.send({embed: result_embed}).then(message => {
            result_msg = message;
        });

        if (banner == 'c') {
            for (var i = 0; i < 10; i++) result = this.character_banner(message, user, result);
        } else if (banner == 'w'){
            for (var i = 0; i < 10; i++) result = this.weapon_banner(message, user, result);
        } else if (banner == 's'){
            for (var i = 0; i < 10; i++) result = this.standard_banner(message, user, result);
        } else {
            // user input other than c/w/s
            result_msg.delete();
            return message.channel.send(`Invalid input!`);
        }

    }

    // set pity at the specific banner
    set_pity(message, user, banner, num) {
        if (!this.players[user.id]) return message.channel.send(`Please use !register to join the salt!`);
        if (!banner) return message.channel.send(`Please select a banner`);
        if (!num || Number(num) < 0) return message.channel.send(`Invalid input`);

        const player = this.players[user.id];
        
        // manually set the pity counter at the selected banner
        switch(banner) {
            case 'c':
                banner = 'character';
                while (num >= 90) num -= 90;
                player.pity_c[0] = Number(num);
                player.pity_c[1] = Number(num) % 10;
            break;

            case 'w':
                banner = 'weapon';
                while (num >= 80) num -= 80;
                player.pity_w[0] = Number(num);
                player.pity_w[1] = Number(num) % 10;
            break;

            case 's':
                banner = 'standard';
                while (num >= 90) num -= 90;
                player.pity_s[0] = Number(num);
                player.pity_s[1] = Number(num) % 10;
            break;

            default:
                return message.channel.send(`Invalid input`);
        }

        return message.channel.send(`Pity counter for ${banner} banner has been set to ${num}`);
    }

    // get summary pulls of user so far
    get_pity (message, user) {
        if (!this.players[user.id]) return message.channel.send(`Please use !register to join the salt!`);

        const player = this.players[user.id];

        var cost = calculate_cost(player.pulls);

        let summary = new Discord.MessageEmbed()
        .setTitle(`${user.username}'s summary`)
        .setDescription(`Total pulls
        Character banner: ${player.pulls[0]}
        Weapon banner: ${player.pulls[1]}
        Standard banner: ${player.pulls[2]}\n4 star: ${player.counter[0]}
        5 star: ${player.counter[1]}\nCost: RM${cost}`);

        return message.channel.send(summary);
    }

    // reset pity of the user
    reset_pity (message) {
        let user = message.author;
        if (!this.players[user.id]) return message.channel.send(`Please use !register to join the salt!`);

        this.players[user.id] = {
            pulls: [0,0,0],
            pity_c: [0,0],
            pity_w: [0,0],
            pity_s: [0,0],
            featured_4: [false,false],
            featured_5: [false,false],
            counter: [0,0],
            item: []
        }

        return message.channel.send(`Your pity counter has been reset!`);
    }

    //kiv

    get_item (message, user) {
        if (!this.players[user.id]) return message.channel.send(`Please use !register to join the salt!`);

        const player = this.players[user.id];


    }


}

module.exports = BotGacha;