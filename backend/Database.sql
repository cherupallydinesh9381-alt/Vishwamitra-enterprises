-- MySQL Database Schema for Vishwamitra Enterprises
-- Database: vishwamitra_enterprises

CREATE DATABASE IF NOT EXISTS vishwamitra_enterprises;
USE vishwamitra_enterprises;

-- 1. Admins Table
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    reset_token VARCHAR(255) DEFAULT NULL,
    reset_token_expiry DATETIME DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed default admin account (Username: admin, Password: admin123, email: admin@vishwamitra.com)
-- Pre-computed bcrypt hash for 'admin123'
INSERT INTO admins (username, email, password_hash)
VALUES ('admin', 'admin@vishwamitra.com', '$2a$10$zY9c5N5R0.O49B0E5w4Uze/xXJb7T9Vv4jHegY6F2rZ8v16J1e3bK')
ON DUPLICATE KEY UPDATE username=username;

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed default categories
INSERT INTO categories (name, slug) VALUES 
('Laptops', 'laptops'),
('Refurbished Laptops', 'refurbished-laptops'),
('Accessories', 'accessories'),
('Repairs & Services', 'services')
ON DUPLICATE KEY UPDATE name=name;

-- 3. Products Table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    processor VARCHAR(100) DEFAULT NULL,
    ram VARCHAR(50) DEFAULT NULL,
    storage VARCHAR(50) DEFAULT NULL,
    display VARCHAR(100) DEFAULT NULL,
    price DECIMAL(10, 2) NOT NULL,
    rating DECIMAL(2, 1) DEFAULT 4.5,
    stock INT DEFAULT 0,
    image_url VARCHAR(255) DEFAULT NULL,
    category_id INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    INDEX idx_brand (brand),
    INDEX idx_category (category_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Brands Table
CREATE TABLE IF NOT EXISTS brands (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    icon_name VARCHAR(100) DEFAULT NULL,
    color VARCHAR(20) DEFAULT '#000000',
    description TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed initial brands (matches frontend config)
INSERT INTO brands (name, icon_name, color, description) VALUES
('Dell', 'SiDell', '#007DB8', 'Reliable business and consumer laptops with excellent build quality.'),
('HP', 'SiHp', '#0096D6', 'Innovative laptops for work, gaming, and everyday computing.'),
('Lenovo', 'SiLenovo', '#E2231A', 'Industry-leading ThinkPads and powerful Legion gaming machines.'),
('Acer', 'SiAcer', '#83B81A', 'Affordable laptops and high-performance Nitro gaming series.'),
('Asus', 'SiAsus', '#00529B', 'Premium Zenbooks, versatile Vivobooks, and ROG gaming laptops.'),
('Apple', 'SiApple', '#555555', 'MacBook Air and Pro with powerful M-series chips.'),
('Msi', 'SiMsi', '#FF0000', 'High-performance gaming laptops and creator workstations.'),
('Samsung', 'SiSamsung', '#1428A0', 'Stunning AMOLED displays in the Galaxy Book series.')
ON DUPLICATE KEY UPDATE name=name;

-- 5. Services Table
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    icon_name VARCHAR(100) DEFAULT NULL,
    image_url VARCHAR(255) DEFAULT NULL,
    description TEXT NOT NULL,
    price VARCHAR(100) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed initial services (matches frontend config)
INSERT INTO services (title, icon_name, image_url, description, price) VALUES
('Laptop Repair', 'FaTools', 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80', 'Complete laptop repair services for all brands. Hardware diagnostics, component replacement, and performance optimization.', 'From ₹499'),
('Motherboard Repair', 'FaMicrochip', 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80', 'Expert chip-level motherboard repair including power issues, short circuits, and component-level fixes with warranty.', 'From ₹1,999'),
('Screen Replacement', 'FaDesktop', 'https://images.unsplash.com/photo-1525547719575-a1d924493059?w=600&q=80', 'Original and compatible LCD/LED screen replacement for cracked, flickering, or dead display panels across all laptop models.', 'From ₹2,499'),
('SSD Upgrade', 'FaHdd', 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&q=80', 'Boost your laptop speed with NVMe and SATA SSD upgrades. Data migration included with genuine branded SSDs.', 'From ₹1,499')
ON DUPLICATE KEY UPDATE title=title;

-- 6. Enquiries Table
CREATE TABLE IF NOT EXISTS enquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    email VARCHAR(150) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('pending', 'contacted', 'resolved') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Contacts Table
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(15) DEFAULT NULL,
    message TEXT NOT NULL,
    status ENUM('unread', 'read', 'archived') DEFAULT 'unread',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status_contact (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Settings Table (Key-Value configuration store)
CREATE TABLE IF NOT EXISTS settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed default settings (matching COMPANY configuration in frontend)
INSERT INTO settings (setting_key, setting_value) VALUES
('company_name', 'Vishwamitra Enterprises'),
('company_tagline', 'Trusted Laptop Sales & Services'),
('company_owner', 'Srilaxmi P'),
('company_phones', '9381877386, 9492060918'),
('company_email', 'vishwamitraenterprises26@gmail.com'),
('company_whatsapp', '919381877386'),
('company_address_full', '#5-77/OF/203, Orchids Flora Apartment, Durga Nagar, Kistareddypet, Ameenpur (M), Sangareddy District, Telangana 502319'),
('social_facebook', 'https://facebook.com'),
('social_instagram', 'https://instagram.com'),
('social_twitter', 'https://twitter.com'),
('social_youtube', 'https://youtube.com')
ON DUPLICATE KEY UPDATE setting_key=setting_key;
