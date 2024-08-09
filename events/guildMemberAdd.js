const fs = require('fs');
const path = require('path');
const { EmbedBuilder } = require('discord.js');
const configPath = path.join(__dirname, '../config.json');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        let config;
        try {
            config = JSON.parse(fs.readFileSync(configPath));
        } catch (error) {
            console.error('Erreur lors de la lecture de la configuration.', error);
            return;
        }

        // Attribution automatique du rôle
        const roleID = config.autoRole;
        if (roleID) {
            const role = member.guild.roles.cache.get(roleID);
            if (role) {
                try {
                    await member.roles.add(role);
                    console.log(`Le rôle ${role.name} a été attribué à ${member.user.tag}.`);
                } catch (error) {
                    console.error(`Impossible d'attribuer le rôle ${role.name} à ${member.user.tag}.`, error);
                }
            } else {
                console.log(`Rôle avec l'ID ${roleID} non trouvé.`);
            }
        } else {
            console.log('Aucun rôle automatique configuré.');
        }

        // Envoi du message de bienvenue dans le salon configuré
        const welcomeChannelId = config.welcomeChannel;
        if (welcomeChannelId) {
            const channel = member.guild.channels.cache.get(welcomeChannelId);
            if (channel && channel.isTextBased()) {
                const embed = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle('Bienvenue !')
                    .setDescription(`Bienvenue ${member.user}! Sur ${member.guild.name}! Grâce à toi, nous sommes maintenant ${member.guild.memberCount} !`)
                    .setThumbnail(member.user.displayAvatarURL())
                    .setTimestamp();

                await channel.send({
                    content: `<@${member.id}>`,
                    embeds: [embed],
                });
            } else {
                console.log(`Salon de bienvenue avec l'ID ${welcomeChannelId} non trouvé.`);
            }
        } else {
            console.log('Aucun salon de bienvenue configuré.');
        }
    },
};
