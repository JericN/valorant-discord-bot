module.exports = {
	name: 'help',
	description: 'send git repository',

	async execute(channel) {
		channel.send('-p {tag#id}\n-stat\n-act\n-agent\n-weapon\n-map\n-team\n-link');
		channel.send('-valo\n-cubio\n-repo');
	},
};
