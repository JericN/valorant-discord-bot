module.exports = {
    name : 'help',
    description : "send git repository",

    async execute(client, message, args, discord){
        message.channel.send('-target\n-stats\n-agents\n-maps\n-link');
    }
}