class data {
	channel;
	id;
	rank;
	acts;
}

async function checkProfile(page) {
	let isAvailable = await page.evaluate(() => {
		let el = document.querySelector('.error-message');
		return el ? true : false;
	});
	if (isAvailable) {
		tool.fetchingData('delete');
		await page.screenshot({
			path: './images/img.png',
			type: 'png',
			clip: { x: 500, y: 950, width: 920, height: 260 },
		});
		message.channel.send({ files: ['./images/img.png'] });
		console.log('404');
		return;
	}
}
async function timeout(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function progress(step) {
	if (step == 0) {
		data.channel.send(data.rank[step]);
		return;
	}
	data.channel.messages.fetch(data.id).then((message) => {
		if (data.rank[step] == 'delete') {
			message.delete();
		} else {
			message.edit(data.rank[step]);
		}
	});
}

module.exports = {
	name: 'function',
	timeout,
	progress,
	checkProfile,
	data,
};
