module.exports = (Discord, client, message) => {
    const channel = client.channels.cache.find(channel => channel.id === '857373218650456086');
    channel.send('Bot is Online');
    console.log('Bot is Online');
}