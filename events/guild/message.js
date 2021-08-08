module.exports = (Discord, client, message) => {
	const prefix = '-';
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const msg = message.content.slice(prefix.length).split(/ +/);
	const cmd = msg.shift().toLowerCase();
	const args = msg.toString();
	const command = client.commands.get(cmd);
	const channel = message.channel;
	if (command) command.execute(channel, args, message, client, Discord);
};
