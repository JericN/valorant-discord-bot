const tool = require('../../functions/function.js');
const fs = require('fs');

module.exports = {
	name: 'act',
	description: 'valorant player stat',

	async execute(channel) {
		const vars = JSON.parse(fs.readFileSync('./data/variables.json'));
		if (tool.dataSet.profile_id == null && tool.dataSet.profile_tag == null) {
			channel.send('No Profile Selected');
			return;
		}
		await getStats();

		async function getStats() {
			let page = tool.dataSet.profile_page;
			await page.click('.ph-nav ul li:nth-child(1) a');
			await tool.waitFor(vars.tab_click_delay);
			await page.click('.trn-mode-selector a:nth-child(1)');
			await tool.waitFor(vars.tab_click_delay);
			for (let i = 0; i < tool.dataSet.acts.length; i++) {
				await page.click('.season-selector ul a:nth-child(' + (i + 2) + ')');
				try {
					await page.waitForSelector('.valorant-rank-icon', {
						timeout: 2000,
					});
				} catch (error) {
					break;
				}

				await page.screenshot({
					path: './images/img' + i + '.png',
					type: 'png',
					clip: { x: 580, y: 720, width: 1000, height: 450 },
				});
				channel.send({ files: ['./images/img' + i + '.png'] });
			}
		}
	},
};
