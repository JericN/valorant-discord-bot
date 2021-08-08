const fs = require('fs');

module.exports = {
	name: 'hist',
	description: 'List of recently accessed profiles',

	async execute(channel) {
		const history = JSON.parse(fs.readFileSync('./data/history.json'));
		const size = Object.keys(history['users']).length;
		for (var i = size - 1; i >= 0; i--) {
			channel.send(history['users'][i].id + '#' + history['users'][i].tag);
		}
	},
};
