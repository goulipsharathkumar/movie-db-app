import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '../services/tmdbApi';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <div className="relative">
        <img src={getImageUrl(movie.poster_path)} alt={movie.title} className="w-full h-96 object-cover" />
        <div className="absolute top-2 right-2 bg-yellow-500 text-gray-900 font-bold px-2 py-1 rounded">
          ⭐ {movie.vote_average?.toFixed(1)}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 h-14">{movie.title}</h3>
        <button onClick={() => navigate(`/movie/${movie.id}`)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
