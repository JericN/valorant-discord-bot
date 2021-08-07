module.exports = {
	name: 'repo',
	description: 'send git repository',

	async execute(channel) {
		channel.send('https://github.com/JericNarte/Discord-Bot');
	},
};
