const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');
  let token = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'vishwamitra_secret_key_2026_secure');
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: 'Token is not valid or expired' });
  }
};
