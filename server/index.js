// Import required modules
const express = require('express');
const { Pool } = require('pg'); // Use pg instead of mysql2
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// Create a PostgreSQL connection pool
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432, // Default PostgreSQL port
});

// Test the database connection on initialization
pool.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        process.exit(1);
    }
    console.log('Successfully connected to the PostgreSQL database');
});

// Basic route to test the connection
app.get('/', (req, res) => {
    res.send('Welcome to the MCU Data Dashboard API!');
});

// GET /api/movies - Retrieve all movies
app.get('/api/movies', async (req, res) => {
    const query = 'SELECT * FROM movies';
    try {
        const { rows } = await pool.query(query);
        res.json(rows);
    } catch (err) {
        console.error('Error executing query:', err.stack);
        res.status(500).send('Error executing query');
    }
});

// GET /api/average-audience-score - Retrieve the average audience score for each phase
app.get('/api/average-audience-score', async (req, res) => {
    const query = 'SELECT phase, AVG(audience_score) AS average_audience_score FROM movies GROUP BY phase';
    try {
        const { rows } = await pool.query(query);
        res.json(rows);
    } catch (err) {
        console.error('Error fetching average audience scores:', err.stack);
        res.status(500).send('Server error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
