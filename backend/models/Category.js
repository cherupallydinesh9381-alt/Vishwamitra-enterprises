const db = require('../config/db');

class Category {
  static async getAll() {
    const [rows] = await db.execute('SELECT * FROM categories ORDER BY name ASC');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM categories WHERE id = ?', [id]);
    return rows[0];
  }

  static async findBySlug(slug) {
    const [rows] = await db.execute('SELECT * FROM categories WHERE slug = ?', [slug]);
    return rows[0];
  }

  static async create(name, slug) {
    const [result] = await db.execute('INSERT INTO categories (name, slug) VALUES (?, ?)', [name, slug]);
    return result.insertId;
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM categories WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Category;
