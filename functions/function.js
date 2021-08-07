class data {
	profile_id;
	profile_tag;
	profile_page;
	channel;
	id;
	rank;
	acts;
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
async function checkProfile(page) {
	try {
		await page.waitForSelector('.error-message', { timeout: 3000 });
	} catch (error) {
		return true;
	}

	console.log('Profile 404');
	progress(8);
	await page.screenshot({
		path: './images/img.png',
		type: 'png',
		clip: { x: 500, y: 950, width: 920, height: 260 },
	});
	data.channel.send({ files: ['./images/img.png'] });
	return false;
}

module.exports = {
	name: 'function',
	timeout,
	progress,
	checkProfile,
	data,
};
