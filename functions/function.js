var dataSet = {
	profile_id: null,
	profile_tag: null,
	profile_page: null,
	channel: null,
	id: null,
	rank: null,
	acts: null,
};

async function waitFor(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function progress(step) {
	if (step == 0) {
		dataSet.channel.send(dataSet.rank[step]);
		return;
	}
	dataSet.channel.messages.fetch(dataSet.id).then((message) => {
		if (dataSet.rank[step] == 'delete') {
			message.delete();
		} else {
			message.edit(dataSet.rank[step]);
		}
	});
}
async function checkProfile(page) {
	try {
		await page.waitForSelector('.error-message', { timeout: 3000 });
	} catch (error) {
		return true;
	}
	progress(8);
	await page.screenshot({
		path: './images/img.png',
		type: 'png',
		clip: { x: 500, y: 950, width: 920, height: 260 },
	});
	dataSet.channel.send({ files: ['./images/img.png'] });
	return false;
}

module.exports = {
	dataSet,
	waitFor,
	progress,
	checkProfile,
};
