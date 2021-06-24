const puppeteer = require('puppeteer');

module.exports = {
    name: 'stats',
    description: "valorant player stat",

    async execute(client, message, args, discord) {
        message.channel.send('stat');

        args = args.replace(",", "%20");
        const pass = args.split("#");
        const id = pass[0];
        const tag = pass[1];

        await scrapperProduct('https://tracker.gg/valorant/profile/riot/' + id + '%23' + tag + '/overview');

        async function scrapperProduct(url) {
            const stats = ['Wins', 'Kills', 'Deaths', 'Assists', 'Headshots', 'Score/Round', 'Kills/Round', 'Clutches', 'Flawless', 'Most Kills (Match)']
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(url);

            const result = await page.evaluate(() => {
                const stats = ['Wins', 'Kills', 'Deaths', 'Assists', 'Headshots', 'Score/Round', 'Kills/Round', 'Clutches', 'Flawless', 'Most Kills (Match)']
                const arr = [];
                let val = document.querySelector('[title="Wins"]').nextElementSibling.innerHTML;
                arr.push(val);
                val = document.querySelector('[title="Kills"]').nextElementSibling.innerHTML;
                arr.push(val);
                val = document.querySelector('[title="Deaths"]').nextElementSibling.innerHTML;
                arr.push(val);
                val = document.querySelector('[title="Assists"]').nextElementSibling.innerHTML;
                arr.push(val);
                val = document.querySelector('[title="Headshots"]').nextElementSibling.innerHTML;
                arr.push(val);
                val = document.querySelector('[title="Score/Round"]').nextElementSibling.innerHTML;
                arr.push(val);
                val = document.querySelector('[title="Kills/Round"]').nextElementSibling.innerHTML;
                arr.push(val);
                val = document.querySelector('[title="Clutches"]').nextElementSibling.innerHTML;
                arr.push(val);
                val = document.querySelector('[title="Flawless"]').nextElementSibling.innerHTML;
                arr.push(val);
                val = document.querySelector('[title="Most Kills (Match)"]').nextElementSibling.innerHTML;
                arr.push(val);
                return arr;
            })
            let ret = "";
            for (let i = 0; i < stats.length; i++) {
                ret = ret.concat(stats[i] + ' : ' + result[i] + '\n');
            }
            message.channel.send(ret);


        }


    }

}