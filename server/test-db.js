const { Pool } = require('pg');
require('dotenv').config();

// Set up the PostgreSQL client
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Test the connection
(async () => {
    try {
        const result = await pool.query('SELECT * FROM movies LIMIT 5;'); // Adjust query as needed
        console.log('Sample Data:', result.rows);
    } catch (err) {
        console.error('Error connecting to the database:', err.message);
    } finally {
        await pool.end(); // Close the connection
    }
})();
