const puppeteer = require('puppeteer');
const tool = require('../../functions/function.js');
const fs = require('fs');

module.exports = {
	name: 'act',
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
		tool.progress(1);
		await getStats('https://tracker.gg/valorant/profile/riot/' + profile.id + '%23' + profile.tag + '/overview');

		async function getStats(url) {
			tool.progress(2);
			const browser = await puppeteer.launch();
			const page = await browser.newPage();
			tool.progress(3);
			await page.setViewport({ width: 1920, height: 1080 });
			await page.goto(url, { waitUntil: 'networkidle2' });
			tool.progress(4);
			await page.click('.trn-mode-selector a:nth-child(1)');
			await tool.timeout(vars.tab_click_delay);
			var num_acts = 0;
			for (var i = 0; i < tool.data.acts.length; i++) {
				await page.click('.season-selector ul a:nth-child(' + (i + 2) + ')');
				await tool.timeout(vars.act_click_delay);
				if ((await page.$('.notice')) != null) {
					tool.progress(7);
					break;
				}
				await page.screenshot({
					path: './images/img' + i + '.png',
					type: 'png',
					clip: { x: 580, y: 720, width: 1000, height: 450 },
				});
				num_acts++;
				if (i == 0) {
					tool.progress(5);
				} else if (i == 4) {
					tool.progress(6);
				} else if (i == tool.data.acts.length) {
					tool.progress(7);
				}
			}
			tool.progress(8);
			for (var i = 0; i < num_acts; i++) {
				channel.send({ files: ['./images/img' + i + '.png'] });
			}
			await browser.close();
		}
	},
};
