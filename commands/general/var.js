const fs = require('fs');

module.exports = {
	name: 'var',
	description: 'valorant player stat',

	async execute(channel, args) {
		const var_content = JSON.parse(fs.readFileSync('./data/variables.json'));
		args = args.toLowerCase().split(',');
		for (let key in var_content) {
			if (args[0] == key) {
				var_content[key] = args[1];
			}
		}
		fs.writeFileSync('./data/variables.json', JSON.stringify(var_content));
		channel.send('Variable Changed -> ' + args[0] + ' : ' + args[1]);
	},
};
