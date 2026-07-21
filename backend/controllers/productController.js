const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');

exports.getAllProducts = async (req, res, next) => {
  try {
    const { brand, categoryId, search, limit, offset } = req.query;
    const filters = { brand, categoryId, search, limit, offset };
    
    const products = await Product.getAll(filters);
    res.status(200).json({ success: true, products });
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const { name, brand, processor, ram, storage, display, price, rating, stock, category_id } = req.body;
    
    let image_url = null;
    if (req.file) {
      // Save path as relative URL
      image_url = `/uploads/${req.file.filename}`;
    }

    const productId = await Product.create({
      name,
      brand,
      processor,
      ram,
      storage,
      display,
      price: parseFloat(price),
      rating: rating ? parseFloat(rating) : 4.5,
      stock: parseInt(stock || '0'),
      image_url,
      category_id: category_id ? parseInt(category_id) : null,
    });

    const newProduct = await Product.findById(productId);
    res.status(201).json({ success: true, message: 'Product created successfully', product: newProduct });
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, brand, processor, ram, storage, display, price, rating, stock, category_id } = req.body;

    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      // Clean up uploaded file if product not found
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    let image_url = existingProduct.image_url;
    if (req.file) {
      // Delete old file if exists and is local upload
      if (existingProduct.image_url && existingProduct.image_url.startsWith('/uploads/')) {
        const oldPath = path.join(__dirname, '..', existingProduct.image_url);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      image_url = `/uploads/${req.file.filename}`;
    }

    await Product.update(id, {
      name,
      brand,
      processor,
      ram,
      storage,
      display,
      price: parseFloat(price),
      rating: rating ? parseFloat(rating) : existingProduct.rating,
      stock: parseInt(stock || '0'),
      image_url,
      category_id: category_id ? parseInt(category_id) : null,
    });

    const updatedProduct = await Product.findById(id);
    res.status(200).json({ success: true, message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Delete image file if exists
    if (product.image_url && product.image_url.startsWith('/uploads/')) {
      const imgPath = path.join(__dirname, '..', product.image_url);
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    }

    await Product.delete(id);
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};
