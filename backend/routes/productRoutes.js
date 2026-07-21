const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { validateProduct } = require('../middleware/validation');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', auth, upload.single('image'), validateProduct, productController.createProduct);
router.put('/:id', auth, upload.single('image'), validateProduct, productController.updateProduct);
router.delete('/:id', auth, productController.deleteProduct);

module.exports = router;
