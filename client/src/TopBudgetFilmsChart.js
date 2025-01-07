// client/src/TopBudgetFilmsChart.js
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

const TopBudgetFilmsChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Budget (in millions)',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
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

            // Sort by budget and get top 5
            const topBudgetFilms = data.sort((a, b) => b.budget - a.budget).slice(0, 5);

            const titles = topBudgetFilms.map((film) => film.title);
            const budgetNumbers = topBudgetFilms.map((film) => film.budget);

            setChartData({
                labels: titles,
                datasets: [
                    {
                        label: 'Budget (in millions)',
                        data: budgetNumbers,
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        borderColor: 'rgba(255, 99, 132, 1)',
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
            <h2>Top 5 Highest Budget Films</h2>
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
                                text: 'Budget (in millions)',
                            },
                        },
                    },
                }}
            />
        </div>
    );
};

export default TopBudgetFilmsChart;