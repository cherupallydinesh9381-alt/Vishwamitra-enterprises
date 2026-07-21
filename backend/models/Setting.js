const db = require('../config/db');

class Setting {
  static async getAll() {
    const [rows] = await db.execute('SELECT setting_key, setting_value FROM settings');
    const settings = {};
    rows.forEach((row) => {
      settings[row.setting_key] = row.setting_value;
    });
    return settings;
  }

  static async getByKey(key) {
    const [rows] = await db.execute('SELECT setting_value FROM settings WHERE setting_key = ?', [key]);
    return rows[0] ? rows[0].setting_value : null;
  }

  static async update(key, value) {
    const [result] = await db.execute(
      'INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?',
      [key, value, value]
    );
    return result.affectedRows > 0;
  }

  static async updateMany(settingsObj) {
    const promises = Object.entries(settingsObj).map(([key, value]) => {
      return this.update(key, String(value));
    });
    await Promise.all(promises);
    return true;
  }
}

module.exports = Setting;
