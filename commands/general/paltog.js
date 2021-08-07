module.exports = {
	name: 'valo',
	description: 'paltog',

	async execute(channel, message) {
		channel.messages.fetch(channel.lastMessageID).then((message) => {
			message.delete();
		});
		channel.send('Paltog <@&848625849934282753> <@&848625949120921601> <:Radiant:854306892460589076>');
	},
};
