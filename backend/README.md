# Vishwamitra Enterprises Backend API

Production-ready backend API for **Vishwamitra Enterprises (Laptop Sales & Services)**. Built using Node.js, Express.js, and MySQL with robust security, request validation, authentication, and email dispatchers.

---

## Features

* **Admin Authentication**: JWT secure login, password update, and email-based password recovery.
* **Dashboard Statistics**: Dynamic aggregation of database counts, recent enquiries, and low stock metrics.
* **Products CRUD**: Secure add, edit, and delete capability with Multer-based image file management.
* **Services CRUD**: Dynamic pricing, icon descriptions, and repair service management.
* **Brands CRUD**: Dynamic partner brands with HEX branding colors.
* **Enquiry & Contact Messages**: Captures customer form data, triggers email alerts via Nodemailer, and lists history.
* **CORS & Security**: Helmet header protection, rate limiters, and SQL injection prevention.
* **Robust Validation**: `express-validator` schema rules for payload cleanliness.

---

## Folder Structure

```
backend/
├── config/
│   ├── db.js             # MySQL Connection Pool configuration (mysql2/promise)
│   └── mail.js           # Nodemailer transport configuration
├── controllers/
│   ├── authController.js       # Admin authentication & profile actions
│   ├── brandController.js      # Brands CRUD
│   ├── contactController.js    # Contact form submissions CRUD
│   ├── dashboardController.js  # Dashboard metrics & statistics
│   ├── enquiryController.js    # Product enquiries CRUD
│   ├── productController.js    # Products CRUD
│   ├── serviceController.js    # Services CRUD
│   └── settingsController.js   # Company constants & social links CRUD
├── middleware/
│   ├── auth.js           # JWT verification for Admin protected routes
│   ├── upload.js         # Multer configuration for file uploads
│   └── validation.js     # express-validator schemas for request validation
├── models/
│   ├── Admin.js          # Admin query helpers
│   ├── Brand.js          # Brand query helpers
│   ├── Category.js       # Category query helpers
│   ├── Contact.js        # Contact message query helpers
│   ├── Enquiry.js        # Enquiry query helpers
│   ├── Product.js        # Product query helpers
│   ├── Service.js        # Service query helpers
│   └── Setting.js        # Settings query helpers
├── routes/
│   ├── authRoutes.js     # /api/auth
│   ├── brandRoutes.js    # /api/brands
│   ├── contactRoutes.js  # /api/contact
│   ├── dashboardRoutes.js# /api/dashboard
│   ├── enquiryRoutes.js  # /api/enquiries
│   ├── productRoutes.js  # /api/products
│   ├── serviceRoutes.js  # /api/services
│   └── settingsRoutes.js # /api/settings
├── services/
│   └── emailService.js   # Wrapper for Nodemailer notification delivery
├── uploads/              # Dynamic product/service uploads folder
├── Database.sql          # DB initialization script
├── .env                  # Configuration keys
├── .env.example          # Environment variables template
├── server.js             # Entrypoint
└── package.json          # Node packages
```

---

## Installation & Setup

### Prerequisites
* **Node.js** (v16+)
* **MySQL Server**

### Step 1: Database Setup
1. Log in to your MySQL terminal or database visualizer (e.g. phpMyAdmin, DBeaver).
2. Execute the queries inside the [`Database.sql`](file:///e:/Dinesh/Web%20Page/vishwamitra/backend/Database.sql) file. This will:
   * Create the database: `vishwamitra_enterprises`
   * Build the required schema tables (`admins`, `categories`, `products`, `brands`, `services`, `enquiries`, `contacts`, `settings`).
   * Seed a default admin account (Username: `admin`, Password: `admin123`, Email: `admin@vishwamitra.com`)
   * Seed initial content for brands, services, and dynamic setting constants matching your UI.

### Step 2: Install Dependencies
Open your command terminal inside the `backend` folder and run:
```bash
npm install
```

### Step 3: Configure Environment Variables
Create a file named `.env` in the `backend/` directory (you can copy the contents of `.env.example`).
```env
PORT=5000
NODE_ENV=development

# MySQL DB Config
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=vishwamitra_enterprises

# JWT Auth Secret
JWT_SECRET=vishwamitra_secret_key_2026_secure
JWT_EXPIRES_IN=7d

# SMTP Nodemailer Email Config
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_gmail_username@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=vishwamitraenterprises26@gmail.com

# React Frontend Origin
FRONTEND_URL=http://localhost:5173
```

---

## Running Locally

### Development Mode (Auto-restart on save)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will launch and display database connection success logs:
```
Database Connected Successfully to: vishwamitra_enterprises
Server running in development mode on port 5000
```

---

## API Documentation

### Public Endpoints

| Method | Endpoint | Description | Query Parameters |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/products` | Retrieve products listing | `brand`, `categoryId`, `search`, `limit`, `offset` |
| **GET** | `/api/products/:id` | Fetch specific product detail | None |
| **GET** | `/api/services` | Retrieve services list | None |
| **GET** | `/api/brands` | Retrieve brand listing | None |
| **GET** | `/api/settings` | Retrieve company info, social links | None |
| **POST** | `/api/enquiries` | Submit client product enquiry | Payload: `name`, `phone`, `email`, `product_name`, `message` |
| **POST** | `/api/contact` | Submit contact form message | Payload: `name`, `email`, `phone` (opt), `message` |
| **POST** | `/api/auth/login` | Login admin and retrieve JWT | Payload: `username`, `password` |
| **POST** | `/api/auth/forgot-password` | Request password reset link | Payload: `email` |
| **POST** | `/api/auth/reset-password` | Reset password using token | Payload: `token`, `password` |

### Protected Endpoints (Requires `Authorization: Bearer <token>`)

| Method | Endpoint | Description | Body Payload / Options |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/auth/profile` | Get authenticated admin profile | None |
| **PUT** | `/api/auth/change-password` | Update current password | `oldPassword`, `newPassword` |
| **GET** | `/api/dashboard/stats` | Retrieve dashboard KPI counts | None |
| **POST** | `/api/products` | Create product (multipart) | Form-data: `name`, `brand`, `price`, `stock`, `image` (file) |
| **PUT** | `/api/products/:id` | Update product (multipart) | Form-data: `name`, `brand`, `price`, `stock`, `image` (file) |
| **DELETE** | `/api/products/:id` | Delete product and image file | None |
| **POST** | `/api/services` | Add new service | `title`, `description`, `price`, `icon_name` |
| **PUT** | `/api/services/:id` | Update service | `title`, `description`, `price`, `icon_name` |
| **DELETE** | `/api/services/:id` | Delete service | None |
| **POST** | `/api/brands` | Add brand | `name`, `description`, `color`, `icon_name` |
| **PUT** | `/api/brands/:id` | Update brand | `name`, `description`, `color`, `icon_name` |
| **DELETE** | `/api/brands/:id` | Delete brand | None |
| **GET** | `/api/enquiries` | Fetch all submitted enquiries | None |
| **PUT** | `/api/enquiries/:id/status` | Update enquiry review status | `status` (`pending`, `contacted`, `resolved`) |
| **DELETE** | `/api/enquiries/:id` | Delete enquiry record | None |
| **GET** | `/api/contact` | Fetch all contact form submissions | None |
| **PUT** | `/api/contact/:id/status` | Update message review status | `status` (`unread`, `read`, `archived`) |
| **DELETE** | `/api/contact/:id` | Delete message record | None |
| **PUT** | `/api/settings` | Update company info config | Key-Value pairs e.g. `{ "company_phones": "..." }` |

---

## Instructions to Connect React Frontend with Backend

Currently, the React frontend uses mock js files in `src/data/`. To fetch data from your new backend instead, follow these simple integration steps:

### 1. Configure API Base URL
Create a configuration file in your React frontend (e.g., `src/utils/api.js`):
```javascript
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

### 2. Connect Forms (Example: `ContactForm.jsx`)
Replace the local mock state submission in `ContactForm.jsx` with an API request:
```javascript
import { API_BASE_URL } from '../../utils/api';

const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length) {
    setErrors(validationErrors);
    return;
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    if (data.success) {
      setSubmitted(true);
      setForm(INITIAL);
      setTimeout(() => setSubmitted(false), 5000);
    } else {
      setErrors({ form: data.message || 'Submission failed' });
    }
  } catch (err) {
    setErrors({ form: 'Server error. Please try again later.' });
  }
};
```

### 3. Fetch Products Dynamically (Example: `Products.jsx`)
Instead of importing static products directly, fetch them from the database:
```javascript
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../utils/api';

// Inside Products Component
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  };
  fetchProducts();
}, []);
```
You can repeat this pattern for **Services** and **Brands** to make your entire frontend content fully dynamic and manageable from your Admin Panel!
