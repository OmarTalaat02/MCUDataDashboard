import axios from 'axios';

// Base URL for the backend API
const BASE_URL = 'http://localhost:3000/api';

// Fetch all MCU movies
export const fetchMovies = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/movies`);
        return response.data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
};

// Fetch average audience scores by phase
export const fetchAverageAudienceScore = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/average-audience-score`);
        return response.data || [];
    } catch (error) {
        console.error('Error fetching average audience scores:', error);
        return [];
    }
};
