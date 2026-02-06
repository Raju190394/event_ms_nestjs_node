-- Database Schema for Event Management System

CREATE DATABASE IF NOT EXISTS event_management_db;
USE event_management_db;

-- 1. Admins Table
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('super_admin', 'editor') DEFAULT 'super_admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Events Table
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    price_range VARCHAR(50),
    image_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3. Services Table
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(100), -- Lucide or FontAwesome icon name
    image_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 4. Venues Table
CREATE TABLE IF NOT EXISTS venues (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    type ENUM('Farm House', 'Party House', 'Villa') NOT NULL,
    location VARCHAR(255),
    capacity INT,
    description TEXT,
    price_per_day DECIMAL(10, 2),
    images JSON, -- Array of image URLs
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 5. Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    media_url VARCHAR(255) NOT NULL,
    media_type ENUM('image', 'video') DEFAULT 'image',
    category VARCHAR(50), -- e.g., 'Wedding', 'Birthday'
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Inquiries Table
CREATE TABLE IF NOT EXISTS inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    event_type VARCHAR(50),
    message TEXT,
    status ENUM('pending', 'contacted', 'resolved') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    event_id INT,
    venue_id INT,
    custom_location VARCHAR(255),
    booking_date DATE NOT NULL,
    guest_count INT,
    additional_services JSON, -- Array of service IDs
    total_amount DECIMAL(10, 2),
    status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE SET NULL,
    FOREIGN KEY (venue_id) REFERENCES venues(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 8. Website Settings Table
CREATE TABLE IF NOT EXISTS settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    `key` VARCHAR(50) UNIQUE NOT NULL,
    `value` TEXT,
    description VARCHAR(255),
    category ENUM('general', 'contact', 'social', 'appearance', 'seo') NOT NULL
);

-- 9. Inventory Items Table
CREATE TABLE IF NOT EXISTS inventory_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50), -- e.g., 'Furniture', 'Tentage', 'Electronics'
    total_stock INT NOT NULL DEFAULT 0,
    available_stock INT NOT NULL DEFAULT 0, -- This will decrease on booking
    unit_type VARCHAR(20) DEFAULT 'piece', -- piece, set, sq_ft
    base_price DECIMAL(10, 2) DEFAULT 0.00, -- Rental price per unit
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 10. Booking Inventory Mapping (Items used in a specific booking)
CREATE TABLE IF NOT EXISTS booking_inventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    item_id INT NOT NULL,
    quantity INT NOT NULL,
    price_at_booking DECIMAL(10, 2), -- Save price in case it changes later
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES inventory_items(id) ON DELETE CASCADE
);

-- Insert Sample Data

INSERT INTO admins (username, email, password) VALUES 
('admin', 'admin@vrikshansh.com', '$2b$10$9ajRStqSC96pSJSPwEfUjuOuWEUM5Ej6TnB5We1NXtS0cej5k.FkW'); -- 'password123'

-- Insert Sample Events
INSERT INTO events (name, slug, description, price_range, image_url) VALUES 
('Royal Weddings', 'wedding-events', 'Comprehensive wedding planning from grand destination weddings to elegant traditional ceremonies. We craft memories with luxury and style.', 'Luxury', 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop'),
('Elite Birthdays', 'birthday-parties', 'Fun, themed, and memorable birthday celebrations for all ages with professional hosting and decor.', 'Premium', 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?q=80&w=2064&auto=format&fit=crop'),
('Corporate Galas', 'corporate-events', 'Professional seminars, product launches, and annual dinners tailored to reflect your company excellence.', 'Elite', 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2070&auto=format&fit=crop');

-- Insert Sample Services
INSERT INTO services (name, slug, description, icon, image_url) VALUES 
('Gourmet Catering', 'catering-services', 'Exquisite multi-cuisine dining with premium presentation and taste.', 'utensils', 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070&auto=format&fit=crop'),
('DJ & Symphony', 'dj-music', 'World-class sound systems and DJs to keep the dance floor alive.', 'music', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop'),
('Luxury Decor', 'decor-floral', 'Breathtaking floral and prop decorations crafted by expert designers.', 'sparkles', 'https://images.unsplash.com/photo-1519225421980-715cb021e1ed?q=80&w=2070&auto=format&fit=crop');

-- Insert Sample Venues
INSERT INTO venues (name, slug, type, location, capacity, description, price_per_day, is_active) VALUES 
('Lush Green Farm', 'lush-green-farm', 'Farm House', 'Gurgaon Sect-45', 800, 'A massive 5-acre lawn perfect for destination weddings and grand receptions.', 95000, true),
('The Royal Palace', 'the-royal-palace', 'Villa', 'Noida Exp-Way', 300, 'Elegant interior villa with pool and ballroom for premium private parties.', 145000, true),
('Skylight Lounge', 'skylight-lounge', 'Party House', 'New Delhi CP', 200, 'Modern rooftop party space with high-end lighting and panoramic views.', 55000, true);

-- Insert Sample Gallery
INSERT INTO gallery (title, media_url, media_type, category, is_featured) VALUES 
('Classic Hindu Wedding', 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069', 'image', 'Wedding', true),
('Modern Corporate Setup', 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012', 'image', 'Corporate', true),
('Vibrant Stage Decor', 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070', 'image', 'General', true),
('Fine Dining Setup', 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070', 'image', 'General', false);

-- Insert Settings
INSERT INTO settings (`key`, `value`, category) VALUES 
('site_name', 'Vrikshansh Technology Events', 'general'),
('contact_email', 'events@vrikshansh.com', 'contact'),
('contact_phone', '+91 99999 88888', 'contact'),
('whatsapp_number', '919999988888', 'contact'),
('address', 'Sector 62, Noida, Uttar Pradesh, India', 'contact'),
('facebook_url', 'https://facebook.com/vrikshansh', 'social'),
('instagram_url', 'https://instagram.com/vrikshansh', 'social'),
('primary_color', '#FF3E6C', 'appearance'),
('meta_title', 'Vrikshansh Events - Creating Unforgettable Moments', 'seo');

-- Insert Sample Inventory
INSERT INTO inventory_items (name, category, total_stock, available_stock, unit_type, base_price) VALUES 
('White Banquet Chair', 'Furniture', 500, 500, 'piece', 25.00),
('Plastic Folding Chair', 'Furniture', 200, 200, 'piece', 15.00),
('Round Table (6ft)', 'Furniture', 50, 50, 'piece', 150.00),
('Sofa Set (3 Seater)', 'Furniture', 20, 20, 'set', 1200.00),
('Waterproof Wedding Tent (50x100)', 'Tentage', 5, 5, 'piece', 15000.00),
('Normal Canopy (10x10)', 'Tentage', 15, 15, 'piece', 2500.00),
('Decorative LED Strings', 'Electronics', 200, 200, 'piece', 40.00),
('Sound System Set (Standard)', 'Electronics', 10, 10, 'set', 5000.00),
('Silent Generator (62kVA)', 'Electronics', 2, 2, 'piece', 8000.00),
('Red Carpet (50ft)', 'Decor', 20, 20, 'piece', 500.00),
('Mist Fan / Air Cooler', 'Equipments', 10, 10, 'piece', 1500.00);
