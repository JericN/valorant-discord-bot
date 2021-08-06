module.exports = {
	name: 'help',
	description: 'send git repository',

	async execute(client, message, args, discord) {
		message.channel.send('-target\n-stats\n-agents\n-maps\n-link');
		message.channel.send('Changing Variables using -var ${}\nact_click_delay\nlast_message_delay');
	},
};
