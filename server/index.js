const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// Create a PostgreSQL connection pool
const db = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// GET /api/movies - Retrieve movies with optional filters
app.get('/api/movies', async (req, res) => {
    try {
        const { phase, genre, imdbRating, rottenTomatoes } = req.query;
        let query = 'SELECT * FROM movies WHERE 1=1';
        const params = [];

        if (phase) {
            params.push(phase);
            query += ` AND phase = $${params.length}`;
        }

        if (genre) {
            params.push(`%${genre}%`);
            query += ` AND genre ILIKE $${params.length}`;
        }

        if (imdbRating) {
            params.push(parseFloat(imdbRating));
            query += ` AND imdb_rating >= $${params.length}`;
        }

        if (rottenTomatoes) {
            params.push(parseInt(rottenTomatoes));
            query += ` AND rotten_tomatoes >= $${params.length}`;
        }

        console.log('Executing query:', query, 'With parameters:', params);
        const { rows } = await db.query(query, params);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /api/average-audience-score - Retrieve the average audience score for each phase
app.get('/api/average-audience-score', async (req, res) => {
    const query = 'SELECT phase, AVG(audience_score) AS average_audience_score FROM movies GROUP BY phase';
    try {
        const { rows } = await db.query(query);
        res.json(rows);
    } catch (err) {
        console.error('Error fetching average audience scores:', err.stack);
        res.status(500).send('Server error');
    }
});

// Test the database connection on initialization
db.connect((err) => {
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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
