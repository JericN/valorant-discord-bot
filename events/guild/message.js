module.exports = (Discord, client, message) => {
	const prefix = '-';
	if (!message.content.startsWith(prefix)) return;
	const msg = message.content.slice(prefix.length).split(/ +/);
	const cmd = msg.shift().toLowerCase();
	const args = msg.toString();
	const command = client.commands.get(cmd);
	if (command) command.execute(client, message, args, Discord);
};
