const tool = require('../../functions/function.js');
const fs = require('fs');

module.exports = {
	name: 'team',
	description: 'valorant player stat',

	async execute(channel) {
		const vars = JSON.parse(fs.readFileSync('./data/variables.json'));
		if (tool.dataSet.profile_id == null && tool.dataSet.profile_tag == null) {
			channel.send('No Profile Selected');
			return;
		}
		await getStats();

		async function getStats() {
			const page = tool.dataSet.profile_page;
			await page.click('.ph-nav ul li:nth-child(2) a');
			await tool.waitFor(vars.tab_click_delay);
			await page.click('.trn-mode-selector a:nth-child(1)');
			await tool.waitFor(vars.tab_click_delay);
			await page.waitForSelector('.acquaintances__list-player');
			const height = await page.evaluate(() => {
				const height = document.querySelector('.acquaintances.card').clientHeight;
				return height;
			});
			await page.screenshot({
				path: './images/img.png',
				type: 'png',
				clip: { x: 257, y: 1170, width: 306, height: height + 10 },
			});
			channel.send({ files: ['./images/img.png'] });
		}
	},
};
