const { body, validationResult } = require('express-validator');

// Helper to check validation results and return error responses
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

const validateEnquiry = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[6-9]\d{9}$/)
    .withMessage('Enter a valid 10-digit mobile number starting with 6-9'),
  body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Enter a valid email address'),
  body('product_name').trim().notEmpty().withMessage('Product name is required'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 5 })
    .withMessage('Message must be at least 5 characters long'),
  handleValidationErrors,
];

const validateContact = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Enter a valid email address'),
  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^[6-9]\d{9}$/)
    .withMessage('Enter a valid 10-digit mobile number starting with 6-9'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 5 })
    .withMessage('Message must be at least 5 characters long'),
  handleValidationErrors,
];

const validateLogin = [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('password').trim().notEmpty().withMessage('Password is required'),
  handleValidationErrors,
];

const validateChangePassword = [
  body('oldPassword').notEmpty().withMessage('Old password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters long'),
  handleValidationErrors,
];

const validateProduct = [
  body('name').trim().notEmpty().withMessage('Product name is required'),
  body('brand').trim().notEmpty().withMessage('Brand is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  body('rating').optional().isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),
  handleValidationErrors,
];

const validateService = [
  body('title').trim().notEmpty().withMessage('Service title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  handleValidationErrors,
];

const validateBrand = [
  body('name').trim().notEmpty().withMessage('Brand name is required'),
  handleValidationErrors,
];

module.exports = {
  validateEnquiry,
  validateContact,
  validateLogin,
  validateChangePassword,
  validateProduct,
  validateService,
  validateBrand,
};
