module.exports = (Discord, client, message) => {
    if(message.author.bot) return;  
    if(!message.guild) return;

    // check if the bot has permission to send message
    const botPermissions = message.channel.permissionsFor(client.user);
    if(!botPermissions.has('SEND_MESSAGES')) return console.log("Doesnt have permission to send message");

    // emote webhook
    if(message.content.match(/[:].*?[:]/)) {
        const emote_webhook = client.utilities.get('emote_webhook')
        // get emote from message
        let emote = message.content.match(/:(.*):/i)[1];
        
        // message from webhook
        emote_webhook(client, message, emote); 
    }

    // paimon reponds to ehe
    if(message.content.match(/\behe\b/i)) {
        var reply = ""
        // check if the bot has attach files permission
        if(!botPermissions.has('ATTACH_FILES')) {
            reply = client.PAIMON_REPLY[Math.floor(Math.random() * (client.PAIMON_REPLY.length-1))];
        } else {
            reply = client.PAIMON_REPLY[Math.floor(Math.random() * client.PAIMON_REPLY.length)];
        }

        message.channel.send(reply);
    }

    if(!message.content.startsWith(client.PREFIX)) return;

    const args = message.content.slice(client.PREFIX.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd);

    if(command) command.execute(client, message, args)
}