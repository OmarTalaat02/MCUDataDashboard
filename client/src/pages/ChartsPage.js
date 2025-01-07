import React from 'react';
import AudienceScoreChart from '../AudienceScoreChart';
import TopGrossingFilmsChart from '../TopGrossingFilmsChart';
import '../styles/ChartsPage.css';
import TopBudgetFilmsChart from "../TopBudgetFilmsChart";

const ChartsPage = () => {
    return (
        <div className="charts-page">
            <h1>MCU Charts</h1>
            <div className="chart-container">
                <div className="chart">
                    <AudienceScoreChart />
                </div>
                <div className="chart">
                    <TopGrossingFilmsChart />
                </div>
                <div className="chart">
                    <TopBudgetFilmsChart />
                </div>
            </div>
        </div>
    );
};

export default ChartsPage;
