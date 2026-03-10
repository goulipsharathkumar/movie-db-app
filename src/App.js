import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PopularMovies from './pages/PopularMovies';
import TopRatedMovies from './pages/TopRatedMovies';
import UpcomingMovies from './pages/UpcomingMovies';
import MovieDetails from './pages/MovieDetails';
import SearchResults from './pages/SearchResults';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App min-h-screen bg-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<PopularMovies />} />
          <Route path="/top-rated" element={<TopRatedMovies />} />
          <Route path="/upcoming" element={<UpcomingMovies />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
