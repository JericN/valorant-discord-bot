module.exports = {
	name: 'link',
	description: 'valorant player stat',

	async execute(client, message, args, discord) {
		message.channel.send('Loading Data');
		args = args.replaceAll(',', '%20');
		const pass = args.split('#');
		const id = pass[0];
		const tag = pass[1];
		message.channel.send('https://tracker.gg/valorant/profile/riot/' + id + '%23' + tag + '/overview');
	},
};
