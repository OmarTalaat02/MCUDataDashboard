import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { fetchMovies } from '../api';

const LandingPage = () => {
    const [totalMovies, setTotalMovies] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [averageAudienceScore, setAverageAudienceScore] = useState(0);
    const [totalBudget, setTotalBudget] = useState(0);

    useEffect(() => {
        const getData = async () => {
            const data = await fetchMovies();
            setTotalMovies(data.length);

            const totalBoxOffice = data.reduce((acc, movie) => acc + parseFloat(movie.box_office || 0), 0);
            setTotalRevenue(totalBoxOffice.toFixed(2));

            const averageScore = data.reduce((acc, movie) => acc + (movie.audience_score || 0), 0) / data.length;
            setAverageAudienceScore(averageScore.toFixed(2));

            const totalBudget = data.reduce((acc, movie) => acc + parseFloat(movie.budget || 0), 0);
            setTotalBudget(totalBudget.toFixed(2));
        };
        getData();
    }, []);

    return (
        <div className="landing-section">
            {/* Title and Intro */}
            <Typography variant="h3" gutterBottom>
                MCU Data Dashboard
            </Typography>
            <Typography variant="body1" gutterBottom>
                Explore insights and data from the Marvel Cinematic Universe.
                Get started by viewing the dataset, exploring charts, or diving into top insights!
            </Typography>

            {/* Quick Access Panel */}
            <div className="quick-access-panel">
                <Button variant="contained" color="primary" href="/dataset">
                    View Dataset
                </Button>
                <Button variant="contained" color="primary" href="/charts">
                    Explore Charts
                </Button>
                <Button variant="contained" color="primary" href="/top-insights">
                    Top Insights
                </Button>
            </div>

            {/* Highlights Section */}
            <div className="highlights-section">
                <div className="highlight-box">
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Total Movies</Typography>
                            <Typography variant="h4">{totalMovies}</Typography>
                        </CardContent>
                    </Card>
                </div>
                <div className="highlight-box">
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Total Box Office Revenue</Typography>
                            <Typography variant="h4">${totalRevenue}M</Typography>
                        </CardContent>
                    </Card>
                </div>
                <div className="highlight-box">
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Average Audience Score</Typography>
                            <Typography variant="h4">{averageAudienceScore}%</Typography>
                        </CardContent>
                    </Card>
                </div>
                <div className="highlight-box">
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Total Budget Spent</Typography>
                            <Typography variant="h4">${totalBudget}M</Typography>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
