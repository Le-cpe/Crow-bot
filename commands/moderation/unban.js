// commands/moderation/unban.js

const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { handleUnbanCommand } = require('../../handlers/unbanHandler');

module.exports = {
    name: 'unban',
    description: 'Débannit un utilisateur en utilisant son ID.',
    async execute(message, args) {
        // Vérifiez si l'utilisateur a la permission de débannir des membres
        if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return message.reply({ content: 'Tu n\'as pas la permission de débannir des membres.', ephemeral: true });
        }

        if (args.length === 0) {
            // Afficher les membres bannis si aucun ID n'est fourni
            try {
                await handleUnbanCommand(message);
            } catch (error) {
                console.error('Erreur lors de l\'exécution de la commande unban :', error);
                await message.reply({ content: 'Il y a eu une erreur lors de la récupération des membres bannis.', ephemeral: true });
            }
        } else {
            // Débannir l'utilisateur avec l'ID fourni
            const userId = args[0];
            if (!userId) {
                return message.reply({ content: 'Tu dois fournir l\'ID de l\'utilisateur à débannir.', ephemeral: true });
            }

            try {
                const bannedUsers = await message.guild.bans.fetch();
                const user = bannedUsers.get(userId);

                if (!user) {
                    return message.reply({ content: 'Cet utilisateur n\'est pas banni.', ephemeral: true });
                }

                await message.guild.bans.remove(userId);
                await message.reply({ content: `L'utilisateur ${user.user.username} a été débanni.`, ephemeral: true });
            } catch (error) {
                console.error('Erreur lors du débannissement de l\'utilisateur :', error);
                await message.reply({ content: 'Il y a eu une erreur lors du débannissement de cet utilisateur.', ephemeral: true });
            }
        }
    },
};
