const pool = require('../config/db');
const bcrypt = require('bcryptjs');

class Admin {
    async findByEmail(email) {
        const [rows] = await pool.query('SELECT * FROM admins WHERE email = ?', [email]);
        return rows[0];
    }

    async findById(id) {
        const [rows] = await pool.query('SELECT * FROM admins WHERE id = ?', [id]);
        return rows[0];
    }

    async create(adminData) {
        const { username, email, password, role } = adminData;
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            'INSERT INTO admins (username, email, password, role) VALUES (?, ?, ?, ?)',
            [username, email, hashedPassword, role || 'super_admin']
        );
        return result.insertId;
    }

    async comparePassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}

module.exports = new Admin();
