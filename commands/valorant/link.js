const tool = require('../../functions/function.js');
module.exports = {
	name: 'link',
	description: 'valorant player stat',

	async execute(channel) {
		if (tool.data.profile_id == null && tool.data.profile_tag == null) {
			channel.send('No Profile Selected');
			return;
		}
		channel.send(
			'https://tracker.gg/valorant/profile/riot/' +
				tool.data.profile_id +
				'%23' +
				tool.data.profile_tag +
				'/overview'
		);
	},
};
