const fs = require('fs');
const path = require('path');

module.exports.handleEvents = (client) => {

    const eventsPath = path.join(__dirname, '../events');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        const event = require(path.join(eventsPath, file));
        if (event.name && event.execute) {
            client.on(event.name, (...args) => event.execute(...args));
        } else {
            console.warn(`L'événement dans le fichier ${file} ne comporte pas de nom ou de méthode execute.`);
        }
    }
};
