const fs = require('fs');

module.exports = {
    name: 'show',
    //aliases
    description: '\'!show <banner>\', Show current featured banner.',
    async execute(client, message, args) {
        // define variable
        var banner = args[0];

        //show, add
        var featured_database = "./database/featured_banner.json";
        let rawdata = fs.readFileSync(featured_database);
        var featured = JSON.parse(rawdata);

        switch (banner) {
            case '4char':
                return message.channel.send(featured.char_4star.join(' '));

            case '5char':
                return message.channel.send(featured.char_5star.join(' '));
            
            case '4weapon':
            case '4weap':
                return message.channel.send(featured.weapon_4star.join(' '));

            case '5weapon':
            case '5weap':
                return message.channel.send(featured.weapon_5star.join(' '));

            default:
                return message.channel.send("Incorrect input!");
        }
    }
}