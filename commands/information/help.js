const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Affiche une liste des commandes disponibles ou des détails sur une commande spécifique.',
    async execute(message, args) {
        const { commands } = message.client;

        // Si un argument est fourni, affiche les détails de cette commande
        const commandName = args[0];
        if (commandName) {
            const command = commands.get(commandName);
            if (!command) {
                return message.reply('Cette commande n\'existe pas.');
            }

            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(`Détails de la commande : ${command.name}`)
                .setDescription(command.description || 'Pas de description disponible.')
                .addFields(
                    { name: 'Usage', value: command.usage ? `\`${command.usage}\`` : 'Pas de format de commande disponible.' },
                    { name: 'Exemple', value: command.example ? `\`${command.example}\`` : 'Pas d\'exemple disponible.' }
                );

            return message.reply({ embeds: [embed] });
        }

        // Sinon, affiche la liste des commandes disponibles
        const commandList = Array.from(commands.values()); // Convertit la Map en tableau
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Liste des Commandes')
            .setDescription('Voici la liste des commandes disponibles :')
            .addFields(
                commandList.map(command => ({
                    name: `\`${command.name}\``,
                    value: command.description || 'Pas de description disponible.'
                }))
            );

        return message.reply({ embeds: [embed] });
    },
};
