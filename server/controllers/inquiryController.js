const pool = require('../config/db');

exports.createInquiry = async (req, res, next) => {
    try {
        const { name, email, phone, event_type, message } = req.body;
        await pool.query(
            'INSERT INTO inquiries (name, email, phone, event_type, message) VALUES (?, ?, ?, ?, ?)',
            [name, email, phone, event_type, message]
        );
        res.status(201).json({ success: true, message: 'Inquiry submitted successfully' });
    } catch (err) {
        next(err);
    }
};

exports.getInquiries = async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT * FROM inquiries ORDER BY created_at DESC');
        res.status(200).json({ success: true, data: rows });
    } catch (err) {
        next(err);
    }
};

exports.updateInquiryStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await pool.query('UPDATE inquiries SET status = ? WHERE id = ?', [status, id]);
        res.status(200).json({ success: true, message: 'Inquiry status updated' });
    } catch (err) {
        next(err);
    }
};
