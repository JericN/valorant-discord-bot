const Discord = require('discord.js')
const client = new Discord.Client({partials:["MESSAGE", "CHANNEL", "REACTION"]});

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

from ping import ping

['command_handler', 'event_handler'].forEach(handler => {
    require('./handlers/'+handler)(client, Discord);
})

client.login('ODU3MzgxNzA5MzcyMTk0ODM2.YNOw8A.8SRx3ZZN5TwT5nhf4mC_jFhzLaU');

//val id#tag stat s/summary
//val id#tag stat a/gent
//val id#tag stat sova
//val id#tag stat killjoy
//val id#tag stat