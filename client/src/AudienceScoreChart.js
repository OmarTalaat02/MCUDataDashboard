import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchAverageAudienceScore } from './api';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AudienceScoreChart = () => {
    const [sortBy, setSortBy] = useState('phase');
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Average Audience Score (%)',
                data: [],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        const getData = async () => {
            const data = await fetchAverageAudienceScore();
            if (!data || data.length === 0) {
                console.error('No data returned from API');
                return;
            }

            if (sortBy === 'phase') {
                data.sort((a, b) => a.phase - b.phase);
            } else if (sortBy === 'score') {
                data.sort((a, b) => b.average_audience_score - a.average_audience_score);
            }

            const phases = data.map((item) => `Phase ${item.phase}`);
            const scores = data.map((item) => item.average_audience_score);

            setChartData({
                labels: phases,
                datasets: [
                    {
                        label: 'Average Audience Score (%)',
                        data: scores,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                    },
                ],
            });
        };

        getData();
    }, [sortBy]);

    const toggleSort = () => {
        setSortBy((prevSortBy) => (prevSortBy === 'phase' ? 'score' : 'phase'));
    };

    if (chartData.labels.length === 0) {
        return <div>Loading chart...</div>;
    }

    return (
        <div style={{ width: '600px', height: '400px', float: 'left' }}>
            <h2>Average Audience Score by MCU Phase</h2>
            <button onClick={toggleSort}>
                Sort by {sortBy === 'phase' ? 'Score' : 'Phase'}
            </button>
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
                                text: 'Audience Score (%)',
                            },
                        },
                    },
                }}
            />
        </div>
    );
};

export default AudienceScoreChart;