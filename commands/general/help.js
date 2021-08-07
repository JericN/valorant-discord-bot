module.exports = {
	name: 'help',
	description: 'send git repository',

	async execute(channel) {
		channel.send('-p\n-stat\n-agent\n-weapon\n-map\n-team\n-link');
		channel.send('-var {}\nact_click_delay\ntab_click_delay\nlast_message_delay');
	},
};
