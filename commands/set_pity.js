module.exports = {
    name: 'setpity',
    //aliases
    description: '\'!setpity <banner> <number>\', banner = c/w/s, Manually set your pity.',
    async execute(client, message, args) {
        const load_database = client.utilities.get('load_database');
        const save_database = client.utilities.get('save_database');
        var banner = '';
        //load database
        var traveller = load_database(message, true);
        if (!traveller) return message.channel.send('You havent register the adventure');

        // Specific which banner
        switch(args[0]) {
            case 'c': banner = 'character';
            break;
            case 'w': banner = 'weapon';
            break;
            case 's': banner = 'standard';
            default: return message.channel.send(`\`${client.PREFIX}setpity <banner> <number>\``);
        }

        // define variable and error checking
        if (!(pity = args[1]) || isNaN(args[1]) || Number(args[1]) < 0) return message.channel.send('Invalid input!');

        // Manually set pity
        traveller[banner].pity_5 = Number(pity);
        traveller[banner].pity_4 = Number(pity) % 10;
        if (args[2]) traveller[banner].featured_5 = true;

        // set the latest pull data of the traveller
        save_database(message, traveller);

        return message.channel.send(`Pity counter for ${banner} banner has been set to ${pity}`);
    }
}