const traveller_database = './database/traveller.json';
const fs = require('fs');

module.exports = function (message, traveller = null){
    // load the database from ./database/traveller.json
    try {
        var rawdata = fs.readFileSync(traveller_database);
        var traveller_data = JSON.parse(rawdata);
    } catch(err) {
        fs.writeFileSync(traveller_database, '{}');
        var rawdata = fs.readFileSync(traveller_database);
        var traveller_data = JSON.parse(rawdata);
    }

    // return all travellers database
    if (traveller == null) return traveller_data;

    // return one particular traveller data
    return traveller_data[message.author.id];
}