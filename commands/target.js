const puppeteer = require('puppeteer');

module.exports = {
	name: 'target',
	description: 'valorant player stat',

	async execute(client, message, args, discord) {
		const fs = require('fs');
		const target = JSON.parse(fs.readFileSync('./data/profile.json'));
		if (!args) {
			message.channel.send('Current Profile: ' + target.id.replace('%20', ' ') + '#' + target.tag);
		} else {
			args = args.replace(',', '%20');
			const pass = args.split('#');
			let new_target = {
				id: pass[0],
				tag: pass[1],
			};
			let data = JSON.stringify(new_target);
			fs.writeFileSync('./data/profile.json', data);
			message.channel.send('Current Profile: ' + pass[0].replace('%20', ' ') + '#' + pass[1]);
		}
	},
};
