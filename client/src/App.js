import React, { useEffect, useState } from 'react';
import { fetchMovies } from './api';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';  // component styles
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from "./pages/LandingPage";
import DatasetPage from './pages/DatasetPage';
import ChartsPage from './pages/ChartsPage';
import FiltersPage from './pages/FiltersPage';


const App = () => {
  const [movies, setMovies] = useState([]);

  // Fetch the movie data from the API when the component loads
  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMovies();
      setMovies(data);
    };
    getMovies();
  }, []);

    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <main className="content">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/dataset" element={<DatasetPage />} />
                        <Route path="/charts" element={<ChartsPage />} />
                        <Route path="/filters" element={<FiltersPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};


export default App;
