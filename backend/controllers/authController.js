const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Admin = require('../models/Admin');
const EmailService = require('../services/emailService');
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'vishwamitra_secret_key_2026_secure';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findByUsername(username);
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Sign JWT
    const token = jwt.sign(
      { id: admin.id, username: admin.username, email: admin.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }
    res.status(200).json({ success: true, admin });
  } catch (error) {
    next(error);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const adminId = req.admin.id;

    // Fetch admin including password hash
    const admin = await Admin.findById(adminId);
    // Find admin by ID but with password query helper
    const fullAdmin = await Admin.findByUsername(req.admin.username);

    if (!fullAdmin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(oldPassword, fullAdmin.password_hash);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Old password is incorrect' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const newHash = await bcrypt.hash(newPassword, salt);

    await Admin.updatePassword(adminId, newHash);

    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const admin = await Admin.findByEmail(email);
    if (!admin) {
      // Do not reveal email existence for security, but return success
      return res.status(200).json({
        success: true,
        message: 'If the email exists, a password reset link has been sent.',
      });
    }

    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetExpiry = new Date(Date.now() + 3600000); // 1 hour

    await Admin.setResetToken(admin.id, resetToken, resetExpiry);

    // Create reset URL
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const resetUrl = `${frontendUrl}/reset-password?token=${resetToken}`;

    // Send email
    await EmailService.sendAdminPasswordReset(admin.email, resetUrl);

    res.status(200).json({
      success: true,
      message: 'If the email exists, a password reset link has been sent.',
    });
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    const admin = await Admin.findByResetToken(token);
    if (!admin) {
      return res.status(400).json({ success: false, message: 'Password reset token is invalid or has expired' });
    }

    const salt = await bcrypt.genSalt(10);
    const newHash = await bcrypt.hash(password, salt);

    await Admin.updatePassword(admin.id, newHash);
    await Admin.clearResetToken(admin.id);

    res.status(200).json({ success: true, message: 'Password has been reset successfully' });
  } catch (error) {
    next(error);
  }
};
