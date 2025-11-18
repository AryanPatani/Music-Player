import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ListMusic, Play } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { startQueue } from '../store/playerSlice';

const PlaylistsView = () => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/playlists');
        const data = response.data || [];
        setPlaylists(data);
        if (data.length > 0) {
          setSelectedId(data[0]._id);
        }
      } catch (err) {
        console.error('Error fetching playlists:', err);
        setError('Failed to load playlists.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  const selectedPlaylist =
    playlists.find((p) => p._id === selectedId) || playlists[0] || null;

  const handlePlaySong = (index) => {
    if (!selectedPlaylist || !selectedPlaylist.songs || selectedPlaylist.songs.length === 0) return;
    dispatch(startQueue({ queue: selectedPlaylist.songs, index }));
  };

  return (
    <div className="flex-1 bg-gray-900 p-8 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <ListMusic className="w-6 h-6" />
        <span>Playlists</span>
      </h1>

      {loading && <div className="text-gray-300 text-sm">Loading playlists...</div>}
      {error && <div className="text-red-400 text-sm mb-4">{error}</div>}

      {!loading && playlists.length === 0 && !error && (
        <div className="text-gray-400 text-sm">No playlists found.</div>
      )}

      {playlists.length > 0 && (
        <div className="flex gap-8">
          <div className="w-1/3 space-y-2">
            {playlists.map((playlist) => (
              <button
                key={playlist._id}
                type="button"
                onClick={() => setSelectedId(playlist._id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-colors ${
                  selectedPlaylist && selectedPlaylist._id === playlist._id
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-900 text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <div className="font-semibold truncate">{playlist.name}</div>
                <div className="text-xs text-gray-400">
                  {playlist.songs?.length || 0} songs
                </div>
              </button>
            ))}
          </div>

          <div className="flex-1">
            {selectedPlaylist && (
              <>
                <h2 className="text-2xl font-bold mb-4">{selectedPlaylist.name}</h2>
                <div className="space-y-2">
                  {selectedPlaylist.songs?.map((song, index) => (
                    <div
                      key={song._id || `${song.title}-${index}`}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 transition-colors group"
                    >
                      <img
                        src={
                          song.imageUrl ||
                          'https://picsum.photos/seed/playlist-song/50/50.jpg'
                        }
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
                        onClick={() => handlePlaySong(index)}
                      >
                        <Play className="w-8 h-8 text-green-500" fill="currentColor" />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistsView;
