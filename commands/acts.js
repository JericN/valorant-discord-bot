const puppeteer = require('puppeteer');
const fs = require('fs');

module.exports = {
	name: 'acts',
	description: 'valorant player stat',

	async execute(client, message, args, discord) {
		const acts = ['e3a1', 'e2a3', 'e2a2', 'e2a1', 'e1a3', 'e1a2', 'e1a1'];
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
		await timeout(1000);
		var id = message.channel.lastMessageID;
		var delay = JSON.parse(fs.readFileSync('./data/variables.json')).act_click_delay;
		const target = JSON.parse(fs.readFileSync('./data/profile.json'));
		await getStats('https://tracker.gg/valorant/profile/riot/' + target.id + '%23' + target.tag + '/overview');

		async function getStats(url) {
			var num_acts = 0;
			const browser = await puppeteer.launch();
			const page = await browser.newPage();
			editmsg(rank[1]);
			await page.setViewport({ width: 1920, height: 1080 });
			await page.goto(url);
			editmsg(rank[2]);
			await page.click('.trn-mode-selector a:nth-child(1)');
			for (var i = 2; i < acts.length + 2; i++) {
				await page.click('.season-selector ul a:nth-child(' + i + ')');
				await page.waitForTimeout(delay);
				if (i % 2 == 0) {
					editmsg(rank[2 + i / 2]);
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
			await browser.close();
			editmsg('delete');
			for (var i = 0; i < num_acts; i++) {
				message.channel.send({ files: ['./images/img' + i + '.png'] });
			}
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
