const puppeteer = require('puppeteer');
const tool = require('../../functions/function.js');
const fs = require('fs');

module.exports = {
	name: 'map',
	description: 'valorant player stat',

	async execute(channel, args, client, discord) {
		const vars = JSON.parse(fs.readFileSync('./data/variables.json'));
		const profile = JSON.parse(fs.readFileSync('./data/profile.json'));
		if (profile.tag == '' && profile.id == '') {
			channel.send('No Profile Selected');
			return;
		}
		tool.data.channel = channel;
		tool.progress(0);
		await tool.timeout(vars.last_msg_delay);
		tool.data.id = channel.lastMessageID;
		await getStats('https://tracker.gg/valorant/profile/riot/' + profile.id + '%23' + profile.tag + '/maps');

		async function getStats(url) {
			tool.progress(1);
			const browser = await puppeteer.launch();
			const page = await browser.newPage();
			tool.progress(3);
			await page.setViewport({ width: 1920, height: 2160 });
			await page.goto(url, { waitUntil: 'networkidle2' });
			tool.progress(5);
			await page.click('.trn-mode-selector a:nth-child(1)');
			await tool.timeout(vars.tab_click_delay);
			tool.progress(7);
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
					clip: { x: 255, y: 720 + (height + 5) * i, width: 1410, height: height },
				});
			}
			tool.progress(8);
			for (let i = 0; i < count; i++) {
				channel.send({ files: ['./images/img' + i + '.png'] });
			}

			await browser.close();
		}
	},
};
