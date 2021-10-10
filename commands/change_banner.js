const fs = require('fs');

function get_array_from_item (item) {
    var item_list = item.split(",");

    return item_list;
}

module.exports = {
    name: 'change',
    //aliases
    description: `\'!change <banner> <item>\', Change featured banner.`,
    async execute(client, message, args) {
        // define variable
        if (!(banner = args[0])) return message.channel.send(`\`!change <banner> <item>\``)
        if (!(item = args[1])) return message.channel.send("Incorrect input!");

        //show, add
        var featured_database = "./database/featured_banner.json";
        let rawdata = fs.readFileSync(featured_database);
        var featured = JSON.parse(rawdata);

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

        // save the database
        let data = JSON.stringify(featured, null, 2);
        fs.writeFileSync(featured_database, data);

        message.channel.send("Banner has been updated!");
    }
}