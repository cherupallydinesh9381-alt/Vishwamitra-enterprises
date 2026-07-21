const db = require('../config/db');

class Product {
  static async getAll(filters = {}) {
    let query = 'SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE 1=1';
    const params = [];

    if (filters.brand) {
      query += ' AND p.brand = ?';
      params.push(filters.brand);
    }

    if (filters.categoryId) {
      query += ' AND p.category_id = ?';
      params.push(parseInt(filters.categoryId));
    }

    if (filters.search) {
      query += ' AND (p.name LIKE ? OR p.brand LIKE ? OR p.processor LIKE ?)';
      const searchWildcard = `%${filters.search}%`;
      params.push(searchWildcard, searchWildcard, searchWildcard);
    }

    query += ' ORDER BY p.id DESC';

    if (filters.limit) {
      query += ' LIMIT ?';
      params.push(parseInt(filters.limit));
      if (filters.offset) {
        query += ' OFFSET ?';
        params.push(parseInt(filters.offset));
      }
    }

    const [rows] = await db.query(query, params);
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute(
      'SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.id = ?',
      [id]
    );
    return rows[0];
  }

  static async create(data) {
    const { name, brand, processor, ram, storage, display, price, rating, stock, image_url, category_id } = data;
    const [result] = await db.execute(
      'INSERT INTO products (name, brand, processor, ram, storage, display, price, rating, stock, image_url, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        name,
        brand,
        processor || null,
        ram || null,
        storage || null,
        display || null,
        price,
        rating !== undefined ? rating : 4.5,
        stock || 0,
        image_url || null,
        category_id || null,
      ]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { name, brand, processor, ram, storage, display, price, rating, stock, image_url, category_id } = data;
    const [result] = await db.execute(
      'UPDATE products SET name = ?, brand = ?, processor = ?, ram = ?, storage = ?, display = ?, price = ?, rating = ?, stock = ?, image_url = ?, category_id = ? WHERE id = ?',
      [
        name,
        brand,
        processor || null,
        ram || null,
        storage || null,
        display || null,
        price,
        rating !== undefined ? rating : 4.5,
        stock || 0,
        image_url || null,
        category_id || null,
        id,
      ]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM products WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async getTotalCount() {
    const [rows] = await db.execute('SELECT COUNT(*) as total FROM products');
    return rows[0].total;
  }

  static async getLowStockCount(threshold = 5) {
    const [rows] = await db.execute('SELECT COUNT(*) as total FROM products WHERE stock <= ?', [threshold]);
    return rows[0].total;
  }
}

module.exports = Product;
