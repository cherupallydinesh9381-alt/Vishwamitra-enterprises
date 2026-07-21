const db = require('../config/db');

class Enquiry {
  static async getAll() {
    const [rows] = await db.execute('SELECT * FROM enquiries ORDER BY id DESC');
    return rows;
  }

  static async getRecent(limit = 5) {
    // MySQL requires integers in LIMIT clause when using prepared statements
    const [rows] = await db.query('SELECT * FROM enquiries ORDER BY id DESC LIMIT ?', [limit]);
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM enquiries WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { name, phone, email, product_name, message } = data;
    const [result] = await db.execute(
      'INSERT INTO enquiries (name, phone, email, product_name, message, status) VALUES (?, ?, ?, ?, ?, ?)',
      [name, phone, email, product_name, message, 'pending']
    );
    return result.insertId;
  }

  static async updateStatus(id, status) {
    const [result] = await db.execute('UPDATE enquiries SET status = ? WHERE id = ?', [status, id]);
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM enquiries WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async getPendingCount() {
    const [rows] = await db.execute("SELECT COUNT(*) as total FROM enquiries WHERE status = 'pending'");
    return rows[0].total;
  }

  static async getTotalCount() {
    const [rows] = await db.execute('SELECT COUNT(*) as total FROM enquiries');
    return rows[0].total;
  }
}

module.exports = Enquiry;
