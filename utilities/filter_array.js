// 4 item sets - 5 star characters, 5 star weapons, 4 star non standard items, 4 star standard items
const fs = require('fs');

module.exports = function (client){
    // separate characters database
    var character_banner = "./database/character_database.json";
    let rawdata = fs.readFileSync(character_banner);
    var characters = JSON.parse(rawdata);

    // separate the database based on their rarity
    client.characters_5 = [];
    client.weapons_5  = [];
    client.items_4= [];
    client.items_standard = [];
    client.items_3 = [];

    for(let character of Object.values(characters)) {
        if (character.rarity == 5) client.characters_5.push(character.name);
        else if (character.rarity == 4 && !character.standard) client.items_4.push(character.name);
        else if (character.standard) client.items_standard.push(character.name);
    }

    // separate weapon database
    var weapon_banner = "./database/weapon_database.json";
    rawdata = fs.readFileSync(weapon_banner);
    var weapons = JSON.parse(rawdata);

    for(let weapon of Object.values(weapons)) {
        if (weapon.rarity == 5) client.weapons_5.push(weapon.name);
        else if (weapon.rarity == 4) client.items_4.push(weapon.name);
        else if (weapon.rarity == 3) client.items_3.push(weapon.name);
    }

    return client;
}