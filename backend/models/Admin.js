const db = require('../config/db');

class Admin {
  static async findById(id) {
    const [rows] = await db.execute(
      'SELECT id, username, email, created_at, updated_at FROM admins WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async findByUsername(username) {
    const [rows] = await db.execute('SELECT * FROM admins WHERE username = ?', [username]);
    return rows[0];
  }

  static async findByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM admins WHERE email = ?', [email]);
    return rows[0];
  }

  static async updatePassword(id, hashedPassword) {
    const [result] = await db.execute(
      'UPDATE admins SET password_hash = ? WHERE id = ?',
      [hashedPassword, id]
    );
    return result.affectedRows > 0;
  }

  static async setResetToken(id, token, expiry) {
    const [result] = await db.execute(
      'UPDATE admins SET reset_token = ?, reset_token_expiry = ? WHERE id = ?',
      [token, expiry, id]
    );
    return result.affectedRows > 0;
  }

  static async findByResetToken(token) {
    const [rows] = await db.execute(
      'SELECT * FROM admins WHERE reset_token = ? AND reset_token_expiry > NOW()',
      [token]
    );
    return rows[0];
  }

  static async clearResetToken(id) {
    const [result] = await db.execute(
      'UPDATE admins SET reset_token = NULL, reset_token_expiry = NULL WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
}

module.exports = Admin;
