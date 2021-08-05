const puppeteer = require('puppeteer');

module.exports = {
    name: 'maps',
    description: "valorant player stat",

    async execute(client, message, args, discord) {
        message.channel.send('Loading Data');
        args = args.replace(",", "%20");
        const pass = args.split("#");
        const id = pass[0];
        const tag = pass[1];

        await scrapperProduct('https://tracker.gg/valorant/profile/riot/' + id + '%23' + tag + '/maps');



        async function scrapperProduct(url) {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.setViewport({width: 1920, height:2160});
            await page.goto(url);

            const height = await page.evaluate(()=>{
                return document.querySelector(".map-stats").scrollHeight+10;

            })
            const count = await page.evaluate(()=>{
                return document.querySelector(".trn-grid.trn-grid--small.maps").childElementCount;
            })
            for(let i=0; i<count; i++){
                await page.screenshot({
                    path: 'img'+i+'.png',
                    type: 'png',
                    clip: {x:255 , y:720+((height+5)*i), width:1410, height: height}
                });
                console.log(i);
                message.channel.send({files: ["img"+i+".png"]});
            }
            

            await browser.close();
        }



    }
}