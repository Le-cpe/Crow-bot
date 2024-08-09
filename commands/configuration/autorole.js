// commands/moderation/autorole.js

const fs = require('fs');
const path = require('path');
const { PermissionsBitField } = require('discord.js');
const configPath = path.join(__dirname, '../../config.json');

module.exports = {
    name: 'autorole',
    description: 'Configure un rôle à attribuer automatiquement aux nouveaux membres.',
    async execute(message, args) {
        // Vérifier si l'utilisateur a les permissions nécessaires
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply({ content: 'Tu n\'as pas la permission de configurer l\'autorole.', ephemeral: true });
        }

        // Vérifier si un rôle est mentionné
        const role = message.mentions.roles.first();
        if (!role) {
            return message.reply({ content: 'Tu dois mentionner le rôle à attribuer.', ephemeral: true });
        }

        // Mettre à jour la configuration
        let config;
        try {
            config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        } catch (error) {
            console.error('Erreur lors de la lecture de la configuration:', error);
            return message.reply({ content: 'Erreur lors de la lecture de la configuration.', ephemeral: true });
        }

        config.autoRole = role.id;

        try {
            fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
        } catch (error) {
            console.error('Erreur lors de la sauvegarde de la configuration:', error);
            return message.reply({ content: 'Erreur lors de la sauvegarde de la configuration.', ephemeral: true });
        }

        // Envoyer un message de confirmation
        return message.reply({ content: `Le rôle ${role.name} sera attribué automatiquement aux nouveaux membres.`, ephemeral: true });
    },
};
