import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../api';

const DatasetPage = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const data = await fetchMovies();
            setMovies(data);
        };
        getMovies();
    }, []);

    return (
        <div>
            <h2>MCU Movies Dataset</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Release Year</th>
                    <th>Phase</th>
                    <th>Box Office</th>
                    <th>IMDb Rating</th>
                    <th>Rotten Tomatoes</th>
                    <th>Director</th>
                    <th>Main Characters</th>
                    <th>Genre</th>
                    <th>Runtime</th>
                    <th>Budget</th>
                    <th>Audience Score</th>
                </tr>
                </thead>
                <tbody>
                {movies.map((movie) => (
                    <tr key={movie.id}>
                        <td>{movie.id}</td>
                        <td>{movie.title}</td>
                        <td>{movie.release_year}</td>
                        <td>{movie.phase}</td>
                        <td>{movie.box_office}</td>
                        <td>{movie.imdb_rating}</td>
                        <td>{movie.rotten_tomatoes}</td>
                        <td>{movie.director}</td>
                        <td>{movie.main_characters}</td>
                        <td>{movie.genre}</td>
                        <td>{movie.runtime}</td>
                        <td>{movie.budget}</td>
                        <td>{movie.audience_score}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default DatasetPage;
