// client/src/TopGrossingFilmsChart.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchMovies } from './api';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const TopGrossingFilmsChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Box Office (in millions)',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        const getData = async () => {
            const data = await fetchMovies();
            if (!data || data.length === 0) {
                console.error('No data returned from API');
                return;
            }

            // Sort by box office and get top 5
            const topGrossingFilms = data.sort((a, b) => b.box_office - a.box_office).slice(0, 5);

            const titles = topGrossingFilms.map((film) => film.title);
            const boxOfficeNumbers = topGrossingFilms.map((film) => film.box_office);

            setChartData({
                labels: titles,
                datasets: [
                    {
                        label: 'Box Office (in millions)',
                        data: boxOfficeNumbers,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            });
        };

        getData();
    }, []);

    if (chartData.labels.length === 0) {
        return <div>Loading chart...</div>;
    }

    return (
        <div className="chart">
            <h2>Top 5 Highest Grossing Films</h2>
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Box Office (in millions)',
                            },
                        },
                    },
                }}
            />
        </div>
    );
};

export default TopGrossingFilmsChart;