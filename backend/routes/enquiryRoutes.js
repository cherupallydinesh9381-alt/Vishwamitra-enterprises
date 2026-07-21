const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiryController');
const auth = require('../middleware/auth');
const { validateEnquiry } = require('../middleware/validation');

router.post('/', validateEnquiry, enquiryController.createEnquiry);
router.get('/', auth, enquiryController.getAllEnquiries);
router.put('/:id/status', auth, enquiryController.updateEnquiryStatus);
router.delete('/:id', auth, enquiryController.deleteEnquiry);

module.exports = router;
