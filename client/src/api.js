import axios from 'axios';

// Base URL for the backend API
const BASE_URL = 'http://localhost:3000/api';

// Fetch all MCU movies
export const fetchMovies = async (queryParams = '') => {
    try {
        const response = await fetch(`http://localhost:3000/api/movies${queryParams}`);
        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }
        return response.json();
    } catch (error) {
        console.error('Error in fetchMovies:', error);
        throw error; // Re-throwing to handle it in the component
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
