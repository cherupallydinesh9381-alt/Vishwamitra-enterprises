const db = require('../config/db');

class Service {
  static async getAll() {
    const [rows] = await db.execute('SELECT * FROM services ORDER BY id ASC');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM services WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { title, icon_name, image_url, description, price } = data;
    const [result] = await db.execute(
      'INSERT INTO services (title, icon_name, image_url, description, price) VALUES (?, ?, ?, ?, ?)',
      [title, icon_name || null, image_url || null, description, price || null]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { title, icon_name, image_url, description, price } = data;
    const [result] = await db.execute(
      'UPDATE services SET title = ?, icon_name = ?, image_url = ?, description = ?, price = ? WHERE id = ?',
      [title, icon_name || null, image_url || null, description, price || null, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM services WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async getTotalCount() {
    const [rows] = await db.execute('SELECT COUNT(*) as total FROM services');
    return rows[0].total;
  }
}

module.exports = Service;
