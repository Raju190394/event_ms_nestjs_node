const mysql = require('mysql2/promise');
require('dotenv').config();

async function checkTable() {
    const conn = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
    try {
        const [rows] = await conn.query('SHOW TABLES LIKE "gallery"');
        console.log('Table exists:', rows.length > 0);
        if (rows.length > 0) {
            const [cols] = await conn.query('DESC gallery');
            console.log('Columns:', cols.map(c => c.Field));
        }
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await conn.end();
    }
}
checkTable();
