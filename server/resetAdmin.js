const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function updateAdmin() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    try {
        const hashedPassword = await bcrypt.hash('password123', 10);
        await connection.query('UPDATE admins SET password = ? WHERE username = ?', [hashedPassword, 'admin']);
        console.log('Admin password updated successfully to "password123"');
    } catch (err) {
        console.error('Update failed:', err);
    } finally {
        await connection.end();
    }
}

updateAdmin();
