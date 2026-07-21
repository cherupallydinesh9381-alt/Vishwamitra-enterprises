const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');
const auth = require('../middleware/auth');
const { validateBrand } = require('../middleware/validation');

router.get('/', brandController.getAllBrands);
router.get('/:id', brandController.getBrandById);
router.post('/', auth, validateBrand, brandController.createBrand);
router.put('/:id', auth, validateBrand, brandController.updateBrand);
router.delete('/:id', auth, brandController.deleteBrand);

module.exports = router;
