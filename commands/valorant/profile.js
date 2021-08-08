const puppeteer = require('puppeteer');
const Tesseract = require('tesseract.js');
const tool = require('../../functions/function.js');
const fs = require('fs');

module.exports = {
	name: 'p',
	description: 'valorant player stat',

	async execute(channel, args, message, client, Discord) {
		if (!args) {
			channel.send('Waiting for Image:');
			args = await getText()
				.then((ret) => {
					channel.send('Profile -> ' + ret);
					return ret;
				})
				.catch(function () {
					channel.send('Failed to Upload Image');
					return -1;
				});
			if (args === -1) {
				return;
			}
		}

		tool.dataSet.channel = channel;
		const vars = JSON.parse(fs.readFileSync('./data/variables.json'));
		var hist = JSON.parse(fs.readFileSync('./data/history.json'));
		args = args.replaceAll(',', '%20');
		const pass = args.split('#');

		if (!args) {
			channel.send('Text Unrecognized');
			return;
		}
		if (!args.includes('#')) {
			channel.send('Invalid Profile');
			return;
		}
		if (pass.length != 2) {
			channel.send('Invalid Profile');
			return;
		}
		if (pass[1].length < 3 || pass[1].length > 5) {
			channel.send('Invalid Tag');
			return;
		}

		tool.progress(0);
		await tool.waitFor(vars.last_msg_delay);
		tool.dataSet.id = channel.lastMessageID;
		tool.progress(1);
		await scrapperProduct(pass);

		async function scrapperProduct(pass) {
			tool.progress(2);
			const browser = await puppeteer.launch();
			const page = await browser.newPage();
			const url = 'https://tracker.gg/valorant/profile/riot/' + pass[0] + '%23' + pass[1] + '/overview';
			tool.progress(3);
			await page.setViewport({ width: 1920, height: 2160 });
			await page.goto(url, { waitUntil: 'networkidle2' });
			tool.progress(4);
			try {
				await page.waitForSelector('.error-message', { timeout: 500 });
				tool.progress(6);
				tool.dataSet.profile_tag = null;
				tool.dataSet.profile_id = null;
				tool.dataSet.profile_page = null;
				await page.screenshot({
					path: './images/img.png',
					type: 'png',
					clip: { x: 500, y: 950, width: 920, height: 260 },
				});
				tool.progress(7);
				tool.progress(8);
				channel.send({ files: ['./images/img.png'] });
			} catch (error) {
				tool.progress(6);
				saveProfile(pass, page);
				await page.screenshot({
					path: './images/img.png',
					type: 'png',
					clip: { x: 250, y: 320, width: 420, height: 120 },
				});
				tool.progress(7);
				tool.progress(8);
				channel.send({ files: ['./images/img.png'] });
			}
		}
		async function getText() {
			return new Promise((resolve, reject) => {
				const collector = new Discord.MessageCollector(
					message.channel,
					(msg) => msg.author.id === message.author.id,
					{ time: 10000 }
				);
				collector.on('collect', (message) => {
					if (message.attachments.size == 0) {
						return;
					}
					const url = message.attachments.first().url;
					Tesseract.recognize(url, 'eng').then(({ data: { text } }) => {
						resolve(text);
					});
				});
				setTimeout(reject, 10000);
			});
		}
		async function saveProfile(pass, page) {
			tool.dataSet.profile_id = pass[0];
			tool.dataSet.profile_tag = pass[1];
			tool.dataSet.profile_page = page;
			hist['users'].push({ id: pass[0], tag: pass[1] });

			fs.writeFileSync('./data/history.json', JSON.stringify(hist));
		}
	},
};
