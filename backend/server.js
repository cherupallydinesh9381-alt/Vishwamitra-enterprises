const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const dotenv = require('dotenv');
const db = require('./config/db');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Test MySQL Database connection on start
async function testConnection() {
  try {
    const connection = await db.getConnection();
    console.log('Database Connected Successfully to:', process.env.DB_NAME || 'vishwamitra_enterprises');
    connection.release();
  } catch (error) {
    console.error('CRITICAL: Database connection failed on startup!');
    console.error(error.message);
  }
}
testConnection();

// Security Middlewares
app.use(helmet({
  crossOriginResourcePolicy: false, // Allows images to be fetched from the client
}));

// CORS Configuration
const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}));

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploads folder statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rate Limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per window
  message: { success: false, message: 'Too many requests from this IP, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(generalLimiter);

// Specific stricter limiters for public submit forms to prevent spam
const formSubmitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 form submissions per 15 mins
  message: { success: false, message: 'Too many submissions. Please wait 15 minutes before submitting again.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Import Routes
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const productRoutes = require('./routes/productRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const brandRoutes = require('./routes/brandRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const contactRoutes = require('./routes/contactRoutes');
const settingsRoutes = require('./routes/settingsRoutes');

// Bind Route Middlewares
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/products', productRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/enquiries', formSubmitLimiter, enquiryRoutes);
app.use('/api/contact', formSubmitLimiter, contactRoutes);
app.use('/api/settings', settingsRoutes);

// Root Endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Vishwamitra Enterprises API Server',
    status: 'Running',
  });
});

// 404 Route Not Found Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Resource not found: ${req.originalUrl}`,
  });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:');
  console.error(err);

  // Multer Error Handling
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'File size too large. Maximum limit is 5MB.',
    });
  }

  // Database Duplicate Entry Key error
  if (err.errno === 1062) {
    return res.status(400).json({
      success: false,
      message: 'A resource with this identifier already exists (duplicate entry).',
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

// Launch server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
