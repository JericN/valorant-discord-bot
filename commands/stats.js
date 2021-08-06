const puppeteer = require('puppeteer');
const tool = require('../functions/function.js');
const fs = require('fs');

module.exports = {
	name: 'stats',
	description: 'valorant player stat',

	async execute(client, message, args, discord) {
		tool.data.channel = message.channel;
		tool.progress(0);
		await tool.timeout(600);
		tool.data.id = message.channel.lastMessageID;
		const target = JSON.parse(fs.readFileSync('./data/profile.json'));
		tool.progress(1);
		await scrapperProduct('https://tracker.gg/valorant/profile/riot/' + target.id + '%23' + target.tag + '/overview');

		async function scrapperProduct(url) {
			tool.progress(2);
			const browser = await puppeteer.launch();
			const page = await browser.newPage();
			tool.progress(3);
			await page.setViewport({ width: 1920, height: 2160 });
			await page.goto(url, { waitUntil: 'networkidle2' });
			tool.progress(4);
			tool.checkProfile(page);
			tool.progress(5);
			await page.click('.trn-mode-selector a:nth-child(1)');
			await page.click('.season-selector ul a:nth-child(1)');
			tool.progress(6);
			await page.waitForTimeout(500);
			tool.progress(7);
			await page.screenshot({
				path: './images/img.png',
				type: 'png',
				clip: { x: 255, y: 720, width: 1410, height: 810 },
			});
			tool.progress(8);
			message.channel.send('All Competitive Acts Summary', { files: ['./images/img.png'] });
			await browser.close();
		}
	},
};
