// commands/moderation/config_bienvenue.js

const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const fs = require('fs');
const path = require('path');
const configPath = path.join(__dirname, '../../config.json'); // Assurez-vous que le chemin est correct

module.exports = {
    name: 'config_bienvenue',
    description: 'Configure le salon pour envoyer un message de bienvenue.',
    async execute(message, args) {
        // Vérifier si l'utilisateur a les permissions nécessaires
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return message.reply({ content: 'Vous n\'avez pas la permission de gérer les salons.', ephemeral: true });
        }

        // Vérifier si un ID de salon est fourni
        if (args.length === 0) {
            return message.reply({ content: 'Veuillez fournir l\'ID du salon où le message de bienvenue sera envoyé.', ephemeral: true });
        }

        const channelId = args[0];
        const channel = message.guild.channels.cache.get(channelId);

        if (!channel || !channel.isTextBased()) {
            return message.reply({ content: 'ID de salon invalide ou le salon n\'est pas un salon textuel.', ephemeral: true });
        }

        // Mettre à jour la configuration
        let config;
        try {
            config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        } catch (error) {
            console.error('Erreur lors de la lecture de la configuration:', error);
            return message.reply({ content: 'Erreur lors de la lecture de la configuration.', ephemeral: true });
        }

        config.welcomeChannel = channelId;

        try {
            fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
        } catch (error) {
            console.error('Erreur lors de la sauvegarde de la configuration:', error);
            return message.reply({ content: 'Erreur lors de la sauvegarde de la configuration.', ephemeral: true });
        }

        // Envoyer un message de confirmation
        const confirmationEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Configuration du Salon de Bienvenue')
            .setDescription(`Le salon de bienvenue a été configuré avec succès : <#${channelId}>`)
            .setTimestamp();

        await message.reply({ embeds: [confirmationEmbed], ephemeral: true });
    },
};
