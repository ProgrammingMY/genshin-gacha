// one day in milisecond
const one_day = 1000*60*60*24;

function get_remaining_time (message, start, end) {
    // calculate the remaining time in days, hours, minutes
    let remaining = (end.getTime()-start.getTime()) / one_day;
    let days = Math.floor(remaining);
    let hours = (remaining - days) * 24;
    let minutes = Math.ceil((hours - Math.floor(hours)) * 60);
    hours = Math.floor(hours);

    message.channel.send(`Abyss will reset in ` + days + ` days ` + hours + ` hours ` + minutes + ` minutes`);
}

module.exports = {
    name: 'abyss',
    description: 'Display remaining time before abyss reset',
    async execute(client, message, args) {
        // get current time
        var today = new Date();
        var abyss1 = new Date(today.getFullYear(), today.getMonth() + 1, 1, 4, 0, 0);
        var abyss2 = new Date(today.getFullYear(), today.getMonth(), 16, 4, 0, 0);

        // first week
        if (today.getDate() <= abyss2.getDate()) {
            get_remaining_time(message, today, abyss2);

        // second week
        } else {
            get_remaining_time(message, today, abyss1);
        }
    }
}