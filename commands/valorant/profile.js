const puppeteer = require('puppeteer');
const tool = require('../../functions/function.js');
const fs = require('fs');

module.exports = {
	name: 'p',
	description: 'valorant player stat',

	async execute(channel, args) {
		const vars = JSON.parse(fs.readFileSync('./data/variables.json'));
		tool.data.channel = channel;
		if (!args) {
			const profile = JSON.parse(fs.readFileSync('./data/profile.json'));
			if (profile.tag == '' && profile.id == '') {
				channel.send('No Profile Selected');
				return;
			}
			channel.send('Current Profile: ' + profile.id.replaceAll('%20', ' ') + '#' + profile.tag);
		} else {
			tool.progress(0);
			await tool.timeout(vars.last_msg_delay);
			tool.data.id = channel.lastMessageID;
			args = args.replaceAll(',', '%20');
			const pass = args.split('#');
			await scrapperProduct('https://tracker.gg/valorant/profile/riot/' + pass[0] + '%23' + pass[1] + '/overview', pass);
		}

		async function scrapperProduct(url, pass) {
			tool.progress(2);
			const browser = await puppeteer.launch();
			const page = await browser.newPage();
			tool.progress(3);
			await page.setViewport({ width: 1920, height: 2160 });
			await page.goto(url, { waitUntil: 'networkidle2' });
			tool.progress(4);
			try {
				await page.waitForSelector('.error-message', { timeout: 500 });
				tool.progress(5);
				let new_profile = {
					id: '',
					tag: '',
				};
				let data = JSON.stringify(new_profile);
				fs.writeFileSync('./data/profile.json', data);
				tool.progress(7);
				await page.screenshot({
					path: './images/img.png',
					type: 'png',
					clip: { x: 500, y: 950, width: 920, height: 260 },
				});
				tool.progress(8);
				channel.send({ files: ['./images/img.png'] });
			} catch (error) {
				tool.progress(5);
				let new_profile = {
					id: pass[0],
					tag: pass[1],
				};
				let data = JSON.stringify(new_profile);
				fs.writeFileSync('./data/profile.json', data);
				tool.progress(7);
				await page.screenshot({
					path: './images/img.png',
					type: 'png',
					clip: { x: 250, y: 320, width: 420, height: 120 },
				});
				tool.progress(8);
				channel.send({ files: ['./images/img.png'] });
			}
			await browser.close();
		}
	},
};
