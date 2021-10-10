const Discord = require('discord.js');

module.exports = {
    name: 'summ',
    //aliases
    description: 'Summary of your pulls',
    async execute(client, message, args) {
        const load_database = client.utilities.get('load_database');
        //load database
        var traveller = load_database(message, true);
        if (!traveller) return message.channel.send('You havent register the adventure');

        // set embed
        let summary_msg = new Discord.MessageEmbed()
        .setColor('0099ff')
        .setTitle(`${traveller.name}'s Pull Summary`)

        .addFields(
            {name:'Total pulls', value:`Pulls:${traveller.pulls} 4★:${traveller.amount_4} 5★:${traveller.amount_5}`},
            {name:'Weapon pity', value:`4★:${traveller['weapon'].pity_4} 5★:${traveller['weapon'].pity_5}`},
            {name:'Character pity', value:`4★:${traveller['character'].pity_4} 5★:${traveller['character'].pity_5}`},
            {name:'Standard pity', value:`4★:${traveller['standard'].pity_4} 5★:${traveller['standard'].pity_5}`}
        )
        .setThumbnail(message.author.avatarURL())

        return message.channel.send({embeds: [summary_msg]});
    }
}