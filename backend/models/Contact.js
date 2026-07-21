const db = require('../config/db');

class Contact {
  static async getAll() {
    const [rows] = await db.execute('SELECT * FROM contacts ORDER BY id DESC');
    return rows;
  }

  static async getRecent(limit = 5) {
    const [rows] = await db.query('SELECT * FROM contacts ORDER BY id DESC LIMIT ?', [limit]);
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM contacts WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { name, email, phone, message } = data;
    const [result] = await db.execute(
      'INSERT INTO contacts (name, email, phone, message, status) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone || null, message, 'unread']
    );
    return result.insertId;
  }

  static async updateStatus(id, status) {
    const [result] = await db.execute('UPDATE contacts SET status = ? WHERE id = ?', [status, id]);
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM contacts WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async getUnreadCount() {
    const [rows] = await db.execute("SELECT COUNT(*) as total FROM contacts WHERE status = 'unread'");
    return rows[0].total;
  }

  static async getTotalCount() {
    const [rows] = await db.execute('SELECT COUNT(*) as total FROM contacts');
    return rows[0].total;
  }
}

module.exports = Contact;
