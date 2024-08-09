const { Client, Events } = require('discord.js');
const config = require('./config.json');
const { handleCommands } = require('./handlers/commandHandler');
const { handleEvents } = require('./handlers/eventHandler');
const { handleInteractions } = require('./handlers/interactionHandler');

const client = new Client({intents: 3276799})

client.once('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag}`);
    handleEvents(client); 
    handleCommands(client); 
});

client.on(Events.InteractionCreate, async (interaction) => {
    await handleInteractions(interaction);
});
client.login(config.token);
