const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { validateService } = require('../middleware/validation');

router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getServiceById);
router.post('/', auth, upload.single('image'), validateService, serviceController.createService);
router.put('/:id', auth, upload.single('image'), validateService, serviceController.updateService);
router.delete('/:id', auth, serviceController.deleteService);

module.exports = router;
