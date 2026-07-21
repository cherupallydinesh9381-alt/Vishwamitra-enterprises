const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const { validateLogin, validateChangePassword } = require('../middleware/validation');

router.post('/login', validateLogin, authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.put('/change-password', auth, validateChangePassword, authController.changePassword);
router.get('/profile', auth, authController.getProfile);

module.exports = router;
