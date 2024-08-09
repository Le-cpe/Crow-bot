const fs = require('fs');
const path = require('path');
const config = require('../config.json');

const commandCategories = ['owner', 'configuration', 'moderation', 'information', 'giveaway', 'invitation', 'level', 'logs', 'protection', 'reactionrole', 'ticket'];

module.exports.handleCommands = (client) => {
    client.on('messageCreate', async (message) => {
        if (!message.content.startsWith(config.prefix) || message.author.bot) return;

        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        let commandFilePath = null;
        for (const category of commandCategories) {
            const filePath = path.join(__dirname, `../commands/${category}`, `${commandName}.js`);
            if (fs.existsSync(filePath)) {
                commandFilePath = filePath;
                break;
            }
        }

        if (!commandFilePath) return;

        const command = require(commandFilePath);

        try {
            await command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('Il y a eu une erreur en exécutant cette commande.');
        }
    });

    client.commands = new Map();
    for (const category of commandCategories) {
        const commandFiles = fs.readdirSync(path.join(__dirname, `../commands/${category}`)).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(path.join(__dirname, `../commands/${category}`, file));
            client.commands.set(command.name, command);
        }
    }
};
