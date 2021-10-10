

module.exports = {
    name: 'login',
    //aliases
    description: 'Manual hoyolab daily login',
    async execute(client, message, args) {
        var daily_login = client.utilities.get('daily_login');
        daily_login(client);
    }
}