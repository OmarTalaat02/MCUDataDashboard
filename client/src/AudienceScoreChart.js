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
    // Initialize with default data structure
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
    }, []);

    // Render only if chartData has labels
    if (chartData.labels.length === 0) {
        return <div>Loading chart...</div>;
    }

    return (
        <div>
            <h2>Average Audience Score by MCU Phase</h2>
            <Bar
                data={chartData}
                options={{
                    responsive: true,
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
