const pool = require('../config/db');

class BaseModel {
    constructor(tableName) {
        this.tableName = tableName;
    }

    async findAll() {
        const [rows] = await pool.query(`SELECT * FROM ${this.tableName}`);
        return rows;
    }

    async findById(id) {
        const [rows] = await pool.query(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id]);
        return rows[0];
    }

    async create(data) {
        const [result] = await pool.query(`INSERT INTO ${this.tableName} SET ?`, [data]);
        return result.insertId;
    }

    async update(id, data) {
        await pool.query(`UPDATE ${this.tableName} SET ? WHERE id = ?`, [data, id]);
        return true;
    }

    async delete(id) {
        await pool.query(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
        return true;
    }
}

module.exports = BaseModel;
