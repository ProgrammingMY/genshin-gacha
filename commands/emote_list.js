require('dotenv').config();

module.exports = {
    name: 'emotelist',
    //aliases
    description: 'List out all emotes avaiable in the emote server',
    async execute(client, message, args) {
        // get emote server
        var emote_server = client.guilds.cache.get(process.env.serverID);

        var emote_list = '';
        // find emote id by its name
        emote_server.emojis.cache.forEach(emoji => {
            emote_list += '\n' + `:${emoji.name}:`;
        });

        message.channel.send(`\`\`\`Emote list\n${emote_list} \`\`\``);
    }
}