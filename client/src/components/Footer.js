import React from 'react';

// Add links to your GitHub repository and the Marvel website

const Footer = () => {
    return (
        <div className="footer">
            <p>© 2024 MCU Data Dashboard</p>
            <p>
                <a href="https://github.com/OmarTalaat02/MCUDataDashboard" target="_blank" rel="noopener noreferrer">
                    GitHub Repository
                </a>
                |
                <a href="https://www.marvel.com/movies" target="_blank" rel="noopener noreferrer">
                    Marvel Website
                </a>
            </p>
        </div>
    );
};

export default Footer;
