const tool = require('../../functions/function.js');
module.exports = {
	name: 'link',
	description: 'valorant player stat',

	async execute(channel, args, client, discord) {
		if (tool.data.profile_id == null && tool.data.profile_tag == null) {
			channel.send('No Profile Selected');
			return;
		}
		channel.send('https://tracker.gg/valorant/profile/riot/' + profile.id + '%23' + profile.tag + '/overview');
	},
};
