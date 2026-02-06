const pool = require('../config/db');

exports.getEvents = async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT * FROM events WHERE is_active = TRUE');
        res.status(200).json({ success: true, count: rows.length, data: rows });
    } catch (err) {
        next(err);
    }
};

exports.getEventBySlug = async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT * FROM events WHERE slug = ?', [req.params.slug]);
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        res.status(200).json({ success: true, data: rows[0] });
    } catch (err) {
        next(err);
    }
};

exports.createEvent = async (req, res, next) => {
    try {
        const { name, slug, description, price_range, image_url } = req.body;
        const [result] = await pool.query(
            'INSERT INTO events (name, slug, description, price_range, image_url) VALUES (?, ?, ?, ?, ?)',
            [name, slug, description, price_range, image_url]
        );
        res.status(201).json({ success: true, data: { id: result.insertId, ...req.body } });
    } catch (err) {
        next(err);
    }
};

exports.updateEvent = async (req, res, next) => {
    try {
        const { id } = req.params;
        await pool.query('UPDATE events SET ? WHERE id = ?', [req.body, id]);
        res.status(200).json({ success: true, message: 'Event updated successfully' });
    } catch (err) {
        next(err);
    }
};

exports.deleteEvent = async (req, res, next) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM events WHERE id = ?', [id]);
        res.status(200).json({ success: true, message: 'Event deleted successfully' });
    } catch (err) {
        next(err);
    }
};
