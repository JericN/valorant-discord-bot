const puppeteer = require('puppeteer');
const fs = require('fs');

module.exports = {
	name: 'var',
	description: 'valorant player stat',

	async execute(client, message, args, discord) {
		var var_content = JSON.parse(fs.readFileSync('./data/variables.json'));
		var args = args.toLowerCase().split(',');
		for (key in var_content) {
			if (args[0] == key) {
				var_content[key] = args[1];
			}
		}
		fs.writeFileSync('./data/variables.json', JSON.stringify(var_content));
		message.channel.send('Variable Changed -> ' + args[0] + ' : ' + args[1]);
	},
};
