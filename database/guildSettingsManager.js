const db = require('./database');

class GuildSettingsManager {
    static async getSettings(guildId) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM guild_settings WHERE guild_id = ?', [guildId], (err, row) => {
                if (err) return reject(err);
                if (row) return resolve(row);
                db.run('INSERT INTO guild_settings (guild_id, antilink_enabled) VALUES (?, 0)', [guildId], function(err) {
                    if (err) return reject(err);
                    resolve({ guild_id: guildId, antilink_enabled: 0 });
                });
            });
        });
    }

    static async setAntilink(guildId, enabled) {
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO guild_settings (guild_id, antilink_enabled) VALUES (?, ?) ON CONFLICT(guild_id) DO UPDATE SET antilink_enabled = excluded.antilink_enabled', [guildId, enabled ? 1 : 0], function(err) {
                if (err) return reject(err);
                resolve();
            });
        });
    }
}

module.exports = GuildSettingsManager;
