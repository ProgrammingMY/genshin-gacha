module.exports = {
    name: 'reset',
    //aliases
    description: 'Reset your pulls data',
    async execute(client, message, args) {
        const load_database = client.utilities.get('load_database');
        const save_database = client.utilities.get('save_database');
        const register = client.commands.get('register');
        //load database
        var travellers = load_database(message);
        args = true;

        // delete current data and create a new one
        delete travellers[message.author.id];
        save_database(message, travellers[message.author.id]);
        register.execute(client, message, args);
    }
}