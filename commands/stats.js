const puppeteer = require('puppeteer');
const fs = require('fs');

module.exports = {
	name: 'stats',
	description: 'valorant player stat',

	async execute(client, message, args, discord) {
		const rank = [
			'<:b3:854306892381552640>',
			'<:s3:854306892435816488>',
			'<:g3:854306893018300436>',
			'<:p3:854306892188483635>',
			'<:d3:854306892503056394>',
			'<:immortal:854306892960366613>',
			'<:Radiant:854306892460589076>',
		];
		message.channel.send(rank[0]);
		await timeout(500);
		var id = message.channel.lastMessageID;

		const target = JSON.parse(fs.readFileSync('./data/profile.json'));
		await scrapperProduct('https://tracker.gg/valorant/profile/riot/' + target.id + '%23' + target.tag + '/overview');

		async function scrapperProduct(url) {
			editmsg(rank[2]);
			const browser = await puppeteer.launch();
			const page = await browser.newPage();
			editmsg(rank[4]);
			await page.setViewport({ width: 1920, height: 2160 });
			await page.goto(url, { waitUntil: 'networkidle2' });
			await page.click('.trn-mode-selector a:nth-child(1)');
			await page.click('.season-selector ul a:nth-child(1)');
			editmsg(rank[5]);
			await page.waitForTimeout(500);
			editmsg(rank[6]);
			await page.screenshot({
				path: './images/img.png',
				type: 'png',
				clip: { x: 255, y: 720, width: 1410, height: 810 },
			});
			editmsg('delete');
			message.channel.send('All Competitive Acts Summary', { files: ['./images/img.png'] });
			await browser.close();
		}
		async function editmsg(rank) {
			message.channel.messages.fetch(id).then((message) => {
				if (rank == 'delete') {
					message.delete();
				} else {
					message.edit(rank);
				}
			});
		}
		async function timeout(ms) {
			return new Promise((resolve) => setTimeout(resolve, ms));
		}
	},
};
