import React, { useState, useEffect } from 'react';
import { getPopularMovies } from '../services/tmdbApi';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true); setError(null);
      try {
        const data = await getPopularMovies(currentPage);
        setMovies(data.results);
        setTotalPages(Math.min(data.total_pages, 500));
      } catch { setError('Failed to fetch popular movies.'); }
      finally { setLoading(false); }
    };
    fetchMovies(); window.scrollTo(0, 0);
  }, [currentPage]);

  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">Popular Movies</h1>
      {loading ? <Loader /> : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
          </div>
          {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
        </>
      )}
    </div>
  );
};

export default PopularMovies;
