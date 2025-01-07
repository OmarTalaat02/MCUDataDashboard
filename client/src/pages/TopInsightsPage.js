import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../api';
import { Card, CardContent, Typography } from '@mui/material';

const TopInsightsPage = () => {
    const [topGrossingMovie, setTopGrossingMovie] = useState(null);
    const [mostPopularCharacter, setMostPopularCharacter] = useState('');
    const [highestRatedMovie, setHighestRatedMovie] = useState(null);

    useEffect(() => {
        const getInsights = async () => {
            const data = await fetchMovies();

            if (data.length > 0) {
                const topGrossing = data.reduce((prev, current) => (prev.box_office > current.box_office) ? prev : current, data[0]);
                setTopGrossingMovie(topGrossing);

                const highestRated = data.reduce((prev, current) => (prev.imdb_rating > current.imdb_rating) ? prev : current, data[0]);
                setHighestRatedMovie(highestRated);

                const characterFrequency = data.reduce((acc, movie) => {
                    if (Array.isArray(movie.main_characters)) {
                        movie.main_characters.forEach(character => {
                            acc[character] = (acc[character] || 0) + 1;
                        });
                    }
                    return acc;
                }, {});
                const mostPopular = Object.keys(characterFrequency).reduce((a, b) => characterFrequency[a] > characterFrequency[b] ? a : b, '');
                setMostPopularCharacter(mostPopular);
            }
        };

        getInsights();
    }, []);

    return (
        <div className="top-insights-page">
            <Typography variant="h2" gutterBottom>Top Insights</Typography>
            <div className="insights-section">
                {topGrossingMovie && (
                    <Card className="insight-card">
                        <CardContent>
                            <Typography variant="h6">Top Grossing Movie</Typography>
                            <Typography variant="h4">{topGrossingMovie.title}</Typography>
                            <Typography variant="body1">Box Office: ${topGrossingMovie.box_office}M</Typography>
                        </CardContent>
                    </Card>
                )}
                {highestRatedMovie && (
                    <Card className="insight-card">
                        <CardContent>
                            <Typography variant="h6">Highest Rated Movie</Typography>
                            <Typography variant="h4">{highestRatedMovie.title}</Typography>
                            <Typography variant="body1">IMDb Rating: {highestRatedMovie.imdb_rating}</Typography>
                        </CardContent>
                    </Card>
                )}
                {mostPopularCharacter && (
                    <Card className="insight-card">
                        <CardContent>
                            <Typography variant="h6">Most Popular Character</Typography>
                            <Typography variant="h4">{mostPopularCharacter}</Typography>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default TopInsightsPage;