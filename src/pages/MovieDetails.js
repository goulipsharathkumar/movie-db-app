import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails, getMovieCredits, getImageUrl } from '../services/tmdbApi';
import CastCard from '../components/CastCard';
import Loader from '../components/Loader';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true); setError(null);
      try {
        const [movieData, creditsData] = await Promise.all([getMovieDetails(id), getMovieCredits(id)]);
        setMovie(movieData);
        setCast(creditsData.cast.slice(0, 12));
      } catch { setError('Failed to fetch movie details.'); }
      finally { setLoading(false); }
    };
    fetchMovieData(); window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <Loader />;
  if (error) return (
    <div className="text-center text-red-500 py-10">
      <p>{error}</p>
      <button onClick={() => navigate(-1)} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded">Go Back</button>
    </div>
  );
  if (!movie) return null;

  const formatRuntime = (m) => `${Math.floor(m / 60)}h ${m % 60}m`;
  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen">
      <div className="relative bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(17,24,39,1)), url(${getImageUrl(movie.backdrop_path, 'original')})` }}>
        <div className="container mx-auto px-4 py-12">
          <button onClick={() => navigate(-1)} className="mb-6 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded">← Back</button>
          <div className="flex flex-col md:flex-row gap-8">
            <img src={getImageUrl(movie.poster_path, 'w500')} alt={movie.title} className="w-full md:w-80 rounded-lg shadow-2xl" />
            <div className="flex-1 text-white">
              <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
              {movie.tagline && <p className="text-gray-400 italic mb-4">"{movie.tagline}"</p>}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500 text-2xl">⭐</span>
                  <span className="text-xl font-semibold">{movie.vote_average?.toFixed(1)}</span>
                  <span className="text-gray-400">({movie.vote_count} votes)</span>
                </div>
                {movie.runtime && <span>🕒 {formatRuntime(movie.runtime)}</span>}
                {movie.release_date && <span>📅 {formatDate(movie.release_date)}</span>}
              </div>
              {movie.genres?.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map(g => <span key={g.id} className="px-3 py-1 bg-blue-600 rounded-full text-sm">{g.name}</span>)}
                  </div>
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Overview</h3>
                <p className="text-gray-300 leading-relaxed">{movie.overview || 'No overview available.'}</p>
              </div>
              {movie.budget > 0 && <p className="mb-2"><span className="font-semibold">Budget:</span> ${movie.budget.toLocaleString()}</p>}
              {movie.revenue > 0 && <p className="mb-2"><span className="font-semibold">Revenue:</span> ${movie.revenue.toLocaleString()}</p>}
            </div>
          </div>
        </div>
      </div>
      {cast.length > 0 && (
        <div className="bg-gray-900 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-6">Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {cast.map(member => <CastCard key={member.id} cast={member} />)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
