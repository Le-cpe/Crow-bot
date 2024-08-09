// commands/moderation/clear.js

const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'clear',
    description: 'Supprime un certain nombre de messages dans le salon.',
    async execute(message, args) {
        // Vérifiez si l'utilisateur a la permission de gérer les messages
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return message.reply({ content: 'Tu n\'as pas la permission de gérer les messages.', ephemeral: true });
        }

        // Vérifiez si un nombre de messages est spécifié
        const amount = parseInt(args[0]);
        if (isNaN(amount) || amount <= 0) {
            return message.reply({ content: 'Tu dois spécifier un nombre de messages à supprimer supérieur à 0.', ephemeral: true });
        }

        try {
            // Récupérer les messages du salon
            let messages = await message.channel.messages.fetch({ limit: Math.min(amount, 100) });

            if (messages.size < amount) {
                // Si le nombre de messages est inférieur au nombre demandé, vider le salon
                let allMessages = messages;
                while (messages.size === 100) {
                    const lastMessageId = messages.last().id;
                    messages = await message.channel.messages.fetch({ limit: 100, before: lastMessageId });
                    allMessages = allMessages.concat(messages);
                }
                // Supprimer tous les messages récupérés
                await message.channel.bulkDelete(allMessages, { filterOld: true });
            } else {
                // Supprimer le nombre spécifié de messages
                await message.channel.bulkDelete(messages, { filterOld: true });
            }
        } catch (error) {
            console.error('Erreur lors de la suppression des messages :', error);
            // Ignorer les erreurs de suppression des messages, comme les messages trop vieux ou non accessibles
        }
    },
};
