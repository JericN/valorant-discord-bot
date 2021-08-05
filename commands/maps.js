const puppeteer = require('puppeteer');
const fs = require('fs');

module.exports = {
    name: 'maps',
    description: "valorant player stat",

    async execute(client, message, args, discord) {
        message.channel.send('Fetching Data...');
        
        const target = JSON.parse(fs.readFileSync('./data/profile.json'));
        await scrapperProduct('https://tracker.gg/valorant/profile/riot/' + target.id + '%23' + target.tag + '/maps');



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
                    path: './images/img'+i+'.png',
                    type: 'png',
                    clip: {x:255 , y:720+((height+5)*i), width:1410, height: height}
                });
                message.channel.send({files: ["./images/img"+i+".png"]});
            }
            

            await browser.close();
        }



    }
}