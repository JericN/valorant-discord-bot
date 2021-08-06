const Discord = require('discord.js');
const tool = require('./functions/function.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

tool.data.rank = [
	'<:i3:854306891773771777>',
	'<:b3:854306892381552640>',
	'<:s3:854306892435816488>',
	'<:g3:854306893018300436>',
	'<:p3:854306892188483635>',
	'<:d3:854306892503056394>',
	'<:immortal:854306892960366613>',
	'<:Radiant:854306892460589076>',
	'delete',
];
tool.data.acts = ['e3a1', 'e2a3', 'e2a2', 'e2a1', 'e1a3', 'e1a2', 'e1a1'];
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach((handler) => {
	require('./handlers/' + handler)(client, Discord);
});
client.login('ODU3MzgxNzA5MzcyMTk0ODM2.YNOw8A.bJDL8lYa7tu3Rhl6GN_3c2JLgAk');
