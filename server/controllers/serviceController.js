const pool = require('../config/db');

exports.getServices = async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT * FROM services WHERE is_active = TRUE');
        res.status(200).json({ success: true, count: rows.length, data: rows });
    } catch (err) {
        next(err);
    }
};

exports.getServiceBySlug = async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT * FROM services WHERE slug = ?', [req.params.slug]);
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }
        res.status(200).json({ success: true, data: rows[0] });
    } catch (err) {
        next(err);
    }
};

exports.createService = async (req, res, next) => {
    try {
        const { name, slug, description, icon, image_url } = req.body;
        const [result] = await pool.query(
            'INSERT INTO services (name, slug, description, icon, image_url) VALUES (?, ?, ?, ?, ?)',
            [name, slug, description, icon, image_url]
        );
        res.status(201).json({ success: true, data: { id: result.insertId, ...req.body } });
    } catch (err) {
        next(err);
    }
};

exports.updateService = async (req, res, next) => {
    try {
        const { id } = req.params;
        await pool.query('UPDATE services SET ? WHERE id = ?', [req.body, id]);
        res.status(200).json({ success: true, message: 'Service updated successfully' });
    } catch (err) {
        next(err);
    }
};

exports.deleteService = async (req, res, next) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM services WHERE id = ?', [id]);
        res.status(200).json({ success: true, message: 'Service deleted successfully' });
    } catch (err) {
        next(err);
    }
};
