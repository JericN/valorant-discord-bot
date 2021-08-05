const puppeteer = require('puppeteer');
const fs = require('fs');

module.exports = {
    name: 'stats',
    description: "valorant player stat",

    async execute(client, message, args, discord) {
        message.channel.send('Fetching Data...');

        const target = JSON.parse(fs.readFileSync('./data/profile.json'));
        await scrapperProduct('https://tracker.gg/valorant/profile/riot/' + target.id + '%23' + target.tag + '/overview');
        
        async function scrapperProduct(url) {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.setViewport({width: 1920, height:2160});
            await page.goto(url,{waitUntil:'networkidle2'});
            await page.click('.trn-mode-selector a:nth-child(1)');
            await page.click('.season-selector ul a:nth-child(1)');
            await page.waitForTimeout(500);
            await page.screenshot({
                path: './images/img.png',
                type: 'png',
                clip: {x:255 , y:720, width:1410, height: 810}
            });

            message.channel.send('All Competitive Acts Summary',{files: ['./images/img.png']});
            await browser.close();
        }
    }
}