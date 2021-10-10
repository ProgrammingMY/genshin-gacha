const fs = require('fs');

module.exports = (client, Discord) => {
    const utility_files = fs.readdirSync('./utilities/').filter(file => file.endsWith('.js'));

    for(const file of utility_files){
        const utility = require(`../utilities/${file}`);
        const utility_name = file.split('.')[0];
        client.utilities.set(utility_name, utility);
    }
}