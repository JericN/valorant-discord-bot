const puppeteer = require('puppeteer');

module.exports = {
    name: 'stats',
    description: "valorant player stat",

    async execute(client, message, args, discord) {
        message.channel.send('stat');

        args = args.replace(",","%20");
        const pass = args.split("#");
        const id = pass[0];
        const tag = pass[1];

        await scrapperProduct('https://tracker.gg/valorant/profile/riot/'+id+'%23'+tag+'/overview');

        async function scrapperProduct(url) {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(url);

            const result = await page.evaluate(() => {
                const arr = [];
                let val = document.querySelector('[title="Wins"]');
                val = val.nextElementSibling.innerText;
                arr.push(val);

                val = document.querySelector('[title="Kills"]');
                val = val.nextElementSibling.innerText;
                arr.push(val);

                val = document.querySelector('[title="Deaths"]');
                val = val.nextElementSibling.innerText;
                arr.push(val);
            })
            message.channel.send('Wins: ' + result[0]);
            message.channel.send('Kills: ' + result[1]);
            message.channel.send('Deaths: ' + result[2]);


        }


    }

}