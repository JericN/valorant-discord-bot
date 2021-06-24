module.exports = {
    name : 'test',
    description : "Bot test",

    async execute(client, message, args, discord){
        message.channel.send('https://github.com/JericNarte/Discord-Bot');
    }
}