const tool = require('../../functions/function.js');
const fs = require('fs');

module.exports = {
	name: 'weapon',
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
			await page.click('.ph-nav ul li:nth-child(5) a');
			await tool.waitFor(vars.tab_click_delay);
			await page.click('.trn-mode-selector a:nth-child(1)');
			await tool.waitFor(vars.tab_click_delay);
			await page.waitForSelector('.segment-used__table.trn-table__container');
			const height = await page.evaluate(() => {
				const height = document.querySelector('.segment-used__table.trn-table__container').clientHeight;
				return height;
			});
			await page.screenshot({
				path: './images/img.png',
				type: 'png',
				clip: { x: 255, y: 1115, width: 1410, height: height + 10 },
			});
			channel.send({ files: ['./images/img.png'] });
		}
	},
};
