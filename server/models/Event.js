const BaseModel = require('./baseModel');

class Event extends BaseModel {
    constructor() {
        super('events');
    }

    async findActive() {
        const [rows] = await pool.query(`SELECT * FROM ${this.tableName} WHERE is_active = TRUE`);
        return rows;
    }

    async findBySlug(slug) {
        const [rows] = await pool.query(`SELECT * FROM ${this.tableName} WHERE slug = ?`, [slug]);
        return rows[0];
    }
}

module.exports = new Event();
