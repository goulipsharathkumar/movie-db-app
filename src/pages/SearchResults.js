import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../services/tmdbApi';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => { setCurrentPage(1); }, [query]);

  useEffect(() => {
    if (!query) { setLoading(false); return; }
    const fetchMovies = async () => {
      setLoading(true); setError(null);
      try {
        const data = await searchMovies(query, currentPage);
        setMovies(data.results);
        setTotalPages(Math.min(data.total_pages, 500));
      } catch { setError('Failed to search movies.'); }
      finally { setLoading(false); }
    };
    fetchMovies(); window.scrollTo(0, 0);
  }, [query, currentPage]);

  if (!query) return <div className="container mx-auto px-4 py-8"><p className="text-white text-center">Please enter a search query.</p></div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-2">Search Results</h1>
      <p className="text-gray-400 mb-6">Showing results for: "{query}"</p>
      {loading ? <Loader /> : movies.length === 0 ? (
        <p className="text-center text-white py-10">No movies found for "{query}".</p>
      ) : (
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

export default SearchResults;
