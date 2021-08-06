const puppeteer = require('puppeteer');
const fs = require('fs');

module.exports = {
	name: 'acts',
	description: 'valorant player stat',

	async execute(client, message, args, discord) {
		message.channel.send('Fetching Data...');
		const acts = ['e3a1', 'e2a3', 'e2a2', 'e2a1', 'e1a3', 'e1a2', 'e1a1'];

		const target = JSON.parse(fs.readFileSync('./data/profile.json'));
		await scrapperProduct('https://tracker.gg/valorant/profile/riot/' + target.id + '%23' + target.tag + '/overview');

		async function scrapperProduct(url) {
			const browser = await puppeteer.launch();
			const page = await browser.newPage();
			await page.setViewport({ width: 1920, height: 1080 });
			await page.goto(url);
			await page.click('.trn-mode-selector a:nth-child(1)');
			for (var i = 2; i < acts.length + 2; i++) {
				await page.click('.season-selector ul a:nth-child(' + i + ')');
				await page.waitForTimeout(1500);
				if ((await page.$('.notice')) != null) {
					console.log('break');
					break;
				}
				await page.screenshot({
					path: './images/img' + i + '.png',
					type: 'png',
					clip: { x: 580, y: 720, width: 1000, height: 450 },
				});
				message.channel.send({ files: ['./images/img' + i + '.png'] });
			}
			await browser.close();
		}
	},
};
