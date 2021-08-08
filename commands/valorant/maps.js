const tool = require('../../functions/function.js');
const fs = require('fs');

module.exports = {
	name: 'map',
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
			await page.click('.ph-nav ul li:nth-child(4) a');
			await tool.waitFor(vars.tab_click_delay);
			await page.click('.trn-mode-selector a:nth-child(1)');
			await tool.waitFor(vars.tab_click_delay);
			await page.waitForSelector('.map-stats');
			const height = await page.evaluate(() => {
				return document.querySelector('.map-stats').clientHeight + 10;
			});
			const count = await page.evaluate(() => {
				return document.querySelector('.trn-grid.trn-grid--small.maps').childElementCount;
			});
			for (let i = 0; i < count; i++) {
				await page.screenshot({
					path: './images/img' + i + '.png',
					type: 'png',
					clip: {
						x: 255,
						y: 720 + (height + 5) * i,
						width: 1410,
						height: height,
					},
				});
				channel.send({ files: ['./images/img' + i + '.png'] });
			}
		}
	},
};
