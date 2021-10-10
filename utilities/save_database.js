const traveller_database = './database/traveller.json';
const load_database = require('./load_database');
const fs = require('fs');

module.exports = function (message, new_traveller) {
    // load the database
    var traveller = load_database(message);

    // save the latest traveller data
    traveller[message.author.id] = new_traveller;

    let data = JSON.stringify(traveller, null, 2);
    fs.writeFileSync(traveller_database, data); 
}