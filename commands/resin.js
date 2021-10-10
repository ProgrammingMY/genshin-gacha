const RESIN = `<:resin:810746618432323626>`;

module.exports = {
    name: 'resin',
    //aliases
    description: '\'!resin <resin> (desired resin)\', Display time when resin is maxed. ',
    async execute(client, message, args) {
        //define variable
        if(!(resin = args[0])) return message.channel.send(`\`${client.PREFIX}resin <resin> (desired resin)\``);
        if(!(final_resin = args[1])) final_resin = 160;

        // get current time
        var today = new Date();
        
        // error checking
        if (isNaN(resin) || resin < 0) return message.channel.send(`Invalid input!`);
        if (isNaN(final_resin)) final_resin = 160;

        // calculate remaining time to max out resin
        let max_resin = (Number(final_resin) - Number(resin)) * 8;
        if (max_resin <= 0) return message.channel.send(`Your resin is already reached the desired amount!`);

        let in_hour = Math.floor(max_resin / 60);
        let in_minute = max_resin % 60;
        let minutes = today.getMinutes() + in_minute;
        let hours = today.getHours() + Math.floor(minutes/60) + in_hour;

        // if more than 60 minutes
        var day = 'today';
        if (minutes > 59) minutes -= 60;
        if (hours > 23) {
            day = 'tomorrow';
            hours -= 24;
        }

        var apm = 'AM';
        var apm_hour = hours;
        if (hours == 0) apm_hour = 12;
        else if (hours >= 12) {
            apm = 'PM';
            if (hours > 12) apm_hour -= 12;
        }
        
        // HH:MM format
        hours = ("0" + hours).slice(-2);
        minutes = ("0" + minutes).slice(-2);

        var format_24 = `${hours}:${minutes}`;
        var format_12 = `${apm_hour}:${minutes}${apm}`;

        var msg = `${final_resin}${RESIN} at \`${format_24}\`/\`${format_12}\` \`${day}\``;

        message.channel.send(msg);
    }
}