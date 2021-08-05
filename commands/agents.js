const puppeteer = require('puppeteer');

module.exports = {
    name: 'agents',
    description: "valorant player stat",

    async execute(client, message, args, discord) {
        message.channel.send('Loading Data');
        args = args.replace(",", "%20");
        const pass = args.split("#");
        const id = pass[0];
        const tag = pass[1];

        await scrapperProduct('https://tracker.gg/valorant/profile/riot/' + id + '%23' + tag + '/agents');



        async function scrapperProduct(url) {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.setViewport({width: 1920, height:2160});
            await page.goto(url);

            const height = await page.evaluate(()=>{
                let height = document.querySelector(".agents-container").scrollHeight;
                return height;
            })
            await page.screenshot({
                path: 'img.png',
                type: 'png',
                clip: {x:255 , y:720, width:1410, height: height+5}
            });
            message.channel.send({files: ["img.png"]});
            await browser.close();
        }

    }
}