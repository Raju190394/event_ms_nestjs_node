const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function setupDatabase() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    });

    try {
        console.log('--- Database Setup Started ---');

        // Read SQL file
        const sqlFile = path.join(__dirname, 'database.sql');
        const sql = fs.readFileSync(sqlFile, 'utf8');

        // Split SQL into individual queries
        // Note: This is a simple split by ';'. For complex SQL, a specialized parser is better.
        const queries = sql.split(';').map(q => q.trim()).filter(q => q.length > 0);

        for (let query of queries) {
            try {
                await connection.query(query);
                // console.log('Executed:', query.substring(0, 50) + '...');
            } catch (err) {
                console.error('Error executing query:', query.substring(0, 50));
                console.error(err.message);
            }
        }

        console.log('--- Database Setup Completed Successfully ---');
    } catch (err) {
        console.error('Setup failed:', err);
    } finally {
        await connection.end();
    }
}

setupDatabase();
