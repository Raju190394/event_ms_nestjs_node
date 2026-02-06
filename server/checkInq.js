const pool = require('./config/db');
require('dotenv').config();

async function checkInquiryTable() {
    try {
        const [rows] = await pool.query('DESCRIBE inquiries');
        console.log('Inquiries Columns:', rows.map(r => r.Field));
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        process.exit();
    }
}
checkInquiryTable();
