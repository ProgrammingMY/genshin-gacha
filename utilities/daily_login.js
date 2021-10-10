const { spawn } = require('child_process');
const Discord = require('discord.js');

module.exports = function(client) {
    // Channel to send notification
    var login_channel = client.channels.cache.get(process.env.channelID); 
    var dataToSend;
    // spawn new child process to call the python script
    const python = spawn('python3', ['./auto-login/genshin-os.py']);
    // collect data from script
    python.stdout.on('data', function (data) {
        dataToSend = data.toString();
        var embedmsg = new Discord.MessageEmbed()
            .setDescription(dataToSend);
        login_channel.send({embeds: [embedmsg]});
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {});
}