const Discord = require('discord.js')
const client = new Discord.Client({partials:["MESSAGE", "CHANNEL", "REACTION"]});

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require('./handlers/'+handler)(client, Discord);
})

client.login('ODU3MzgxNzA5MzcyMTk0ODM2.YNOw8A.1dmyYBL4Bz7DQsmN9q3nLUn0qnc');
