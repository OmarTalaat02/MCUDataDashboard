import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../api'; // Ensure correct import

import '../styles/DatasetPage.css';

const DatasetPage = () => {
    const [movies, setMovies] = useState([]);
    const [phase, setPhase] = useState('');
    const [genre, setGenre] = useState('');
    const [imdbRating, setImdbRating] = useState('');
    const [rottenTomatoes, setRottenTomatoes] = useState('');

    // Fetch movies based on filters
    useEffect(() => {
        const getMovies = async () => {
            const queryParams = new URLSearchParams({
                phase: phase || '',
                genre: genre || '',
                imdbRating: imdbRating || '',
                rottenTomatoes: rottenTomatoes || '',
            }).toString();

            try {
                const filteredMovies = await fetchMovies(`?${queryParams}`);
                setMovies(filteredMovies);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        getMovies();
    }, [phase, genre, imdbRating, rottenTomatoes]);

    return (
        <div className="dataset-page">
            <header className="dataset-header">
                <h1>MCU Movies Dataset</h1>
                <p>Explore and filter movies from the Marvel Cinematic Universe</p>
            </header>

            <div className="filters-panel">
                <div className="filter-group">
                    <label>Phase:</label>
                    <select value={phase} onChange={(e) => setPhase(e.target.value)}>
                        <option value="">All Phases</option>
                        <option value="1">Phase 1</option>
                        <option value="2">Phase 2</option>
                        <option value="3">Phase 3</option>
                        <option value="4">Phase 4</option>
                        <option value="5">Phase 5</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label>Genre:</label>
                    <select value={genre} onChange={(e) => setGenre(e.target.value)}>
                        <option value="">All Genres</option>
                        <option value="Action">Action</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Sci-Fi">Sci-Fi</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Comedy">Comedy</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label>IMDb Rating:</label>
                    <select value={imdbRating} onChange={(e) => setImdbRating(e.target.value)}>
                        <option value="">IMDb Rating</option>
                        <option value="5">Above 5</option>
                        <option value="6">Above 6</option>
                        <option value="7">Above 7</option>
                        <option value="8">Above 8</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label>Rotten Tomatoes:</label>
                    <select value={rottenTomatoes} onChange={(e) => setRottenTomatoes(e.target.value)}>
                        <option value="">Rotten Tomatoes</option>
                        <option value="70">Above 70%</option>
                        <option value="80">Above 80%</option>
                        <option value="90">Above 90%</option>
                    </select>
                </div>

                <button
                    className="clear-filters"
                    onClick={() => {
                        setPhase('');
                        setGenre('');
                        setImdbRating('');
                        setRottenTomatoes('');
                    }}
                >
                    Clear Filters
                </button>
            </div>

            <table className="movies-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Release Year</th>
                    <th>Phase</th>
                    <th>Box Office</th>
                    <th>IMDb Rating</th>
                    <th>Rotten Tomatoes</th>
                    <th>Genre</th>
                    <th>Runtime</th>
                    <th>Budget</th>
                    <th>Audience Score</th>
                </tr>
                </thead>
                <tbody>
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <tr key={movie.id}>
                            <td>{movie.id}</td>
                            <td>{movie.title}</td>
                            <td>{movie.release_year}</td>
                            <td>{movie.phase}</td>
                            <td>{movie.box_office}</td>
                            <td>{movie.imdb_rating}</td>
                            <td>{movie.rotten_tomatoes}</td>
                            <td>{movie.genre}</td>
                            <td>{movie.runtime}</td>
                            <td>{movie.budget}</td>
                            <td>{movie.audience_score}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="11">No movies found for the selected filters.</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default DatasetPage;
