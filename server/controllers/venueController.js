const pool = require('../config/db');

exports.getVenues = async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT * FROM venues WHERE is_active = TRUE');
        res.status(200).json({ success: true, count: rows.length, data: rows });
    } catch (err) {
        next(err);
    }
};

exports.getVenueBySlug = async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT * FROM venues WHERE slug = ?', [req.params.slug]);
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Venue not found' });
        }
        res.status(200).json({ success: true, data: rows[0] });
    } catch (err) {
        next(err);
    }
};

exports.createVenue = async (req, res, next) => {
    try {
        const { name, slug, type, location, capacity, description, price_per_day, images } = req.body;
        const [result] = await pool.query(
            'INSERT INTO venues (name, slug, type, location, capacity, description, price_per_day, images) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [name, slug, type, location, capacity, description, price_per_day, JSON.stringify(images)]
        );
        res.status(201).json({ success: true, data: { id: result.insertId, ...req.body } });
    } catch (err) {
        next(err);
    }
};

exports.updateVenue = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = { ...req.body };
        if (data.images) data.images = JSON.stringify(data.images);

        await pool.query('UPDATE venues SET ? WHERE id = ?', [data, id]);
        res.status(200).json({ success: true, message: 'Venue updated successfully' });
    } catch (err) {
        next(err);
    }
};

exports.deleteVenue = async (req, res, next) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM venues WHERE id = ?', [id]);
        res.status(200).json({ success: true, message: 'Venue deleted successfully' });
    } catch (err) {
        next(err);
    }
};
