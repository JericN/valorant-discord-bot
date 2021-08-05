const puppeteer = require('puppeteer');
const fs = require('fs');

module.exports = {
    name: 'agents',
    description: "valorant player stat",

    async execute(client, message, args, discord) {
        message.channel.send('Loading Data');

        const target = JSON.parse(fs.readFileSync('./data/profile.json'));
        await scrapperProduct('https://tracker.gg/valorant/profile/riot/' + target.id + '%23' + target.tag + '/agents');



        async function scrapperProduct(url) {
            message.channel.send('Fetching Data...');
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.setViewport({width: 1920, height:2160});
            await page.goto(url,{waitUntil:'networkidle2'});

            const height = await page.evaluate(()=>{
                let height = document.querySelector(".agents-container").scrollHeight;
                return height;
            })
            await page.screenshot({
                path: './images/img.png',
                type: 'png',
                clip: {x:255 , y:720, width:1410, height: height+5}
            });
            message.channel.send({files: ["./images/img.png"]});
            await browser.close();
        }

    }
}