

module.exports = {
    name: 'help',
    //aliases
    description: 'Display all commands available',
    async execute(client, message, args) {
        var command_list = '';
        var space = ' ';
        var max_spaces = 30;
        var repeats = 0;

        // loop through all commands
        client.commands.forEach(command => {
            repeats = max_spaces - command.name.length;
            command_list += `\n${client.PREFIX}${command.name}${space.repeat(repeats)}- ${command.description}`;
        });

        message.channel.send(`\`\`\`List of commands\n${command_list}\`\`\``);
    }
}