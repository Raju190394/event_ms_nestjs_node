-- Inventory Management System
USE event_management_db;

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

-- Sample Inventory Data
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
