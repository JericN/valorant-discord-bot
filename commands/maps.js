const puppeteer = require('puppeteer');
const tool = require('../functions/function.js');
const fs = require('fs');

module.exports = {
	name: 'maps',
	description: 'valorant player stat',

	async execute(client, message, args, discord) {
		tool.data.channel = message.channel;
		tool.progress(0);
		await tool.timeout(1000);
		tool.data.id = message.channel.lastMessageID;
		const target = JSON.parse(fs.readFileSync('./data/profile.json'));
		tool.progress(1);
		await scrapperProduct('https://tracker.gg/valorant/profile/riot/' + target.id + '%23' + target.tag + '/maps');

		async function scrapperProduct(url) {
			tool.progress(2);
			const browser = await puppeteer.launch();
			const page = await browser.newPage();
			tool.progress(3);
			await page.setViewport({ width: 1920, height: 2160 });
			await page.goto(url);
			tool.progress(4);
			tool.checkProfile(page);
			tool.progress(5);
			const height = await page.evaluate(() => {
				return document.querySelector('.map-stats').scrollHeight + 10;
			});
			tool.progress(6);
			const count = await page.evaluate(() => {
				return document.querySelector('.trn-grid.trn-grid--small.maps').childElementCount;
			});
			tool.progress(7);
			for (let i = 0; i < count; i++) {
				await page.screenshot({
					path: './images/img' + i + '.png',
					type: 'png',
					clip: { x: 255, y: 720 + (height + 5) * i, width: 1410, height: height },
				});
			}
			tool.progress(8);
			for (let i = 0; i < count; i++) {
				message.channel.send({ files: ['./images/img' + i + '.png'] });
			}

			await browser.close();
		}
	},
};
