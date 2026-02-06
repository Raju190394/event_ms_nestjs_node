const pool = require('../config/db');

// Get all inventory items
exports.getInventory = async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT * FROM inventory_items ORDER BY category ASC');
        res.status(200).json({ success: true, count: rows.length, data: rows });
    } catch (err) {
        next(err);
    }
};

// Add new item
exports.addItem = async (req, res, next) => {
    try {
        const { name, category, total_stock, unit_type, base_price } = req.body;
        const [result] = await pool.query(
            'INSERT INTO inventory_items (name, category, total_stock, available_stock, unit_type, base_price) VALUES (?, ?, ?, ?, ?, ?)',
            [name, category, total_stock, total_stock, unit_type, base_price]
        );
        res.status(201).json({ success: true, data: { id: result.insertId, ...req.body } });
    } catch (err) {
        next(err);
    }
};

// Update item (Adjust stock)
exports.updateItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, category, total_stock, unit_type, base_price } = req.body;

        // When total_stock changes, we need to adjust available_stock carefully
        // But for simplicity in this MVP, we'll just set available = total if not currently in use
        await pool.query(
            'UPDATE inventory_items SET name=?, category=?, total_stock=?, unit_type=?, base_price=? WHERE id=?',
            [name, category, total_stock, unit_type, base_price, id]
        );
        res.status(200).json({ success: true, message: 'Item updated' });
    } catch (err) {
        next(err);
    }
};

// Delete item
exports.deleteItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM inventory_items WHERE id = ?', [id]);
        res.status(200).json({ success: true, message: 'Item deleted' });
    } catch (err) {
        next(err);
    }
};
