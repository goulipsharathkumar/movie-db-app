import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition">
            movieDB
          </Link>
          <div className="flex gap-4">
            <Link to="/" className="px-4 py-2 rounded hover:bg-gray-800 transition">Popular</Link>
            <Link to="/top-rated" className="px-4 py-2 rounded hover:bg-gray-800 transition">Top Rated</Link>
            <Link to="/upcoming" className="px-4 py-2 rounded hover:bg-gray-800 transition">Upcoming</Link>
          </div>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies..."
              className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500 w-64"
            />
            <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded transition font-medium">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
