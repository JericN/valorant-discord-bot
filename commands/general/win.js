module.exports = {
	name: 'win',
	description: 'predicts win rate today',

	async execute(channel) {
		let a = Math.floor(Math.random() * 101);
		if (a >= 50) {
			channel.send('Win prediction today ' + a + '%<:Radiant:854306892460589076>');
		} else {
			channel.send('Win prediction today ' + a + '%<:i1:854306891584503829>');
		}
	},
};
