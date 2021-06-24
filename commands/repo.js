module.exports = {
    name : 'repo',
    description : "send git repository",

    async execute(client, message, args, discord){
        message.channel.send('https://github.com/JericNarte/Discord-Bot');
    }
}