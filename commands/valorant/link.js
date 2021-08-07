const fs = require('fs');
module.exports = {
	name: 'link',
	description: 'valorant player stat',

	async execute(channel, args, client, discord) {
		const profile = JSON.parse(fs.readFileSync('./data/profile.json'));
		if (profile.tag == '' && profile.id == '') {
			channel.send('No Profile Selected');
			return;
		}
		channel.send('https://tracker.gg/valorant/profile/riot/' + profile.id + '%23' + profile.tag + '/overview');
	},
};
