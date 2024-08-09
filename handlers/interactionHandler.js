// handlers/interactionHandler.js

const { ButtonStyle } = require('discord.js');
const { handleUnbanCommand } = require('./unbanHandler');

module.exports.handleInteractions = async (interaction) => {
    if (interaction.isCommand()) {
        const command = interaction.client.commands.get(interaction.commandName);

        if (command) {
            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'Il y a eu une erreur lors de l\'exécution de cette commande.', ephemeral: true });
            }
        }
    }

    if (interaction.isButton()) {
        if (interaction.customId.startsWith('unban_')) {
            const userId = interaction.customId.split('_')[1];

            try {
                await interaction.guild.bans.remove(userId);
                await interaction.reply({ content: `L'utilisateur avec l'ID ${userId} a été débanni.`, ephemeral: true });
            } catch (error) {
                console.error('Erreur lors du débannissement via bouton :', error);
                await interaction.reply({ content: 'Il y a eu une erreur lors du débannissement de cet utilisateur.', ephemeral: true });
            }
        }
    }
};
