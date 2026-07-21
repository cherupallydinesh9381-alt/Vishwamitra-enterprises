const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const auth = require('../middleware/auth');
const { validateContact } = require('../middleware/validation');

router.post('/', validateContact, contactController.createContact);
router.get('/', auth, contactController.getAllContacts);
router.put('/:id/status', auth, contactController.updateContactStatus);
router.delete('/:id', auth, contactController.deleteContact);

module.exports = router;
