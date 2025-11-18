import React, { useState } from 'react';
import { Search, Play } from 'lucide-react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { startQueue } from '../store/playerSlice';

const SearchView = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    setLoading(true);
    setError('');

    try {
      const response = await axios.get('http://localhost:5000/api/songs/search', {
        params: { q: trimmed },
      });
      setResults(response.data || []);
    } catch (err) {
      console.error('Error searching songs:', err);
      setError('Failed to search songs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePlayResult = (index) => {
    if (!results || results.length === 0) return;
    dispatch(startQueue({ queue: results, index }));
  };

  return (
    <div className="flex-1 bg-gray-900 p-8 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Search className="w-6 h-6" />
        <span>Search</span>
      </h1>

      <form onSubmit={handleSearch} className="mb-6 flex gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What do you want to listen to?"
          className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-full bg-green-500 hover:bg-green-400 text-black text-sm font-semibold"
        >
          Search
        </button>
      </form>

      {loading && <div className="text-gray-300 text-sm mb-4">Searching...</div>}
      {error && <div className="text-red-400 text-sm mb-4">{error}</div>}

      <div className="space-y-2">
        {results.map((song, index) => (
          <div
            key={song._id || `${song.title}-${index}`}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 transition-colors group"
          >
            <img
              src={song.imageUrl || 'https://picsum.photos/seed/search-song/50/50.jpg'}
              alt={song.title}
              className="w-12 h-12 object-cover rounded"
            />
            <div className="flex-1">
              <h4 className="font-medium text-white">{song.title}</h4>
              <p className="text-sm text-gray-400">{song.artist}</p>
            </div>
            <button
              type="button"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handlePlayResult(index)}
            >
              <Play className="w-8 h-8 text-green-500" fill="currentColor" />
            </button>
          </div>
        ))}
        {!loading && results.length === 0 && query.trim() && !error && (
          <div className="text-gray-400 text-sm">No results found.</div>
        )}
      </div>
    </div>
  );
};

export default SearchView;
