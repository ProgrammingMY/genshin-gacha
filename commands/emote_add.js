require('dotenv').config();

module.exports = {
    name: 'emoteadd',
    //aliases
    description: 'Upload an image/gif with caption \'!emoteadd <emote name>\'',
    async execute(client, message, args) {
        if (!args[0]) return message.channel.send('Upload an image/gif with caption \`!emoteadd <emote name>\`');
        // define variable
        var emote_name = args[0];

        // get emote server
        var emote_server = client.guilds.cache.get(process.env.serverID);

        // check emote name and attachment
        let find_emote = emote_server.emojis.cache.find(emoji => emoji.name === emote_name.toLowerCase());
        if (find_emote) return message.channel.send('Emote name is already existed in the server');
        if (message.attachments.size == 0) return message.channel.send('Invalid link');

        // check attachment url
        let image_url = message.attachments.first().url;

        // add emote to the server
        try {
            emote_server.emojis.create(image_url, emote_name)
            .then(emoji => message.channel.send(`Successfully added ${emoji.name} to the server`))
            .catch(console.error);
            
        } catch (err) {
            console.log(err);
            message.channel.send('Something wrong happenned');
        }
    }
}