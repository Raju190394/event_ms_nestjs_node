const pool = require('../config/db');

exports.getSettings = async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT * FROM settings');
        const settings = {};
        rows.forEach(row => {
            settings[row.key] = row.value;
        });
        res.status(200).json({ success: true, data: settings });
    } catch (err) {
        next(err);
    }
};

exports.updateSettings = async (req, res, next) => {
    try {
        const updates = req.body; // { key: value, ... }
        const queries = Object.keys(updates).map(key => {
            return pool.query('UPDATE settings SET value = ? WHERE `key` = ?', [updates[key], key]);
        });
        await Promise.all(queries);
        res.status(200).json({ success: true, message: 'Settings updated' });
    } catch (err) {
        next(err);
    }
};
