const db = require('../config/db');

class Brand {
  static async getAll() {
    const [rows] = await db.execute('SELECT * FROM brands ORDER BY id ASC');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM brands WHERE id = ?', [id]);
    return rows[0];
  }

  static async findByName(name) {
    const [rows] = await db.execute('SELECT * FROM brands WHERE name = ?', [name]);
    return rows[0];
  }

  static async create(data) {
    const { name, icon_name, color, description } = data;
    const [result] = await db.execute(
      'INSERT INTO brands (name, icon_name, color, description) VALUES (?, ?, ?, ?)',
      [name, icon_name || null, color || '#000000', description || null]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { name, icon_name, color, description } = data;
    const [result] = await db.execute(
      'UPDATE brands SET name = ?, icon_name = ?, color = ?, description = ? WHERE id = ?',
      [name, icon_name || null, color || '#000000', description || null, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM brands WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async getTotalCount() {
    const [rows] = await db.execute('SELECT COUNT(*) as total FROM brands');
    return rows[0].total;
  }
}

module.exports = Brand;
