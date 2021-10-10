const fs = require('fs');

module.exports = {
    name: 'register',
    description: 'Join the salt!',
    async execute(client, message, args) {
        // load the database
        var user = message.author;
        const load_database = client.utilities.get('load_database');
        const save_database = client.utilities.get('save_database');
        var traveller = load_database(message);

        if (!traveller) {
            traveller = [];
        }

        // if traveller is not registered yet
        if (!traveller[message.author.id]) {
            traveller[message.author.id] = {
                name: message.author.username,
                pulls: 0,
                amount_4: 0,
                amount_5: 0,
                weapon:{
                    pity_4: 0,
                    pity_5: 0,
                    featured_4: false,
                    featured_5: false
                },
                character:{
                    pity_4: 0,
                    pity_5: 0,
                    featured_4: false,
                    featured_5: false
                },
                standard:{
                    pity_4: 0,
                    pity_5: 0
                }
            }

            // save the traveller data into a database
            save_database(message, traveller[message.author.id]);

            if (args) return message.channel.send(user.username + `'s pulls reset!`);
            return message.channel.send(user.username + ` has joined the salt!`);
        } else
        return message.channel.send(`You already joined the salt!`);
    }

}
