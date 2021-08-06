const puppeteer = require('puppeteer');
const tool = require('../functions/function.js');
const fs = require('fs');

module.exports = {
	name: 'acts',
	description: 'valorant player stat',

	async execute(client, message, args, discord) {
		tool.data.channel = message.channel;
		tool.progress(0);
		await tool.timeout(1000);
		tool.data.id = message.channel.lastMessageID;
		var delay = JSON.parse(fs.readFileSync('./data/variables.json')).act_click_delay;
		const target = JSON.parse(fs.readFileSync('./data/profile.json'));
		await getStats('https://tracker.gg/valorant/profile/riot/' + target.id + '%23' + target.tag + '/overview');

		async function getStats(url) {
			tool.progress(1);
			var num_acts = 0;
			const browser = await puppeteer.launch();
			const page = await browser.newPage();
			tool.progress(2);
			await page.setViewport({ width: 1920, height: 1080 });
			await page.goto(url);
			tool.progress(3);
			tool.checkProfile(page);
			tool.progress(4);
			await page.click('.trn-mode-selector a:nth-child(1)');
			for (var i = 2; i < tool.data.acts.length + 2; i++) {
				await page.click('.season-selector ul a:nth-child(' + i + ')');
				await page.waitForTimeout(delay);
				if (i % 2 == 0 && 3 + i / 2 < 8) {
					tool.progress(3 + i / 2);
				}
				if ((await page.$('.notice')) != null) {
					console.log('break');
					break;
				}
				await page.screenshot({
					path: './images/img' + (i - 2) + '.png',
					type: 'png',
					clip: { x: 580, y: 720, width: 1000, height: 450 },
				});
				num_acts++;
			}
			tool.progress(8);
			for (var i = 0; i < num_acts; i++) {
				message.channel.send({ files: ['./images/img' + i + '.png'] });
			}
			await browser.close();
		}
	},
};
