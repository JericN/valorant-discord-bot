const puppeteer = require('puppeteer');
const tool = require('../../functions/function.js');
const fs = require('fs');

module.exports = {
	name: 'agent',
	description: 'valorant player stat',

	async execute(channel, args, client, discord) {
		const vars = JSON.parse(fs.readFileSync('./data/variables.json'));
		if (tool.data.profile_id == null && tool.data.profile_tag == null) {
			channel.send('No Profile Selected');
			return;
		}
		await getStats();

		async function getStats() {
			page = tool.data.profile_page;
			await page.click('.ph-nav ul li:nth-child(3) a');
			await tool.timeout(vars.tab_click_delay);
			await page.click('.trn-mode-selector a:nth-child(1)');
			await tool.timeout(vars.tab_click_delay);
			await page.waitForSelector('.agents-container');
			const height = await page.evaluate(() => {
				let height = document.querySelector('.agents-container').clientHeight;
				return height;
			});
			await page.screenshot({
				path: './images/img.png',
				type: 'png',
				clip: { x: 255, y: 720, width: 1410, height: height + 5 },
			});
			channel.send({ files: ['./images/img.png'] });
		}
	},
};
