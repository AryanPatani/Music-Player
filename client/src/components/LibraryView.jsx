import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Library, Disc3, ListMusic } from 'lucide-react';

const LibraryView = () => {
  const [albums, setAlbums] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        setLoading(true);
        const [albumsRes, playlistsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/albums'),
          axios.get('http://localhost:5000/api/playlists'),
        ]);
        setAlbums(albumsRes.data || []);
        setPlaylists(playlistsRes.data || []);
      } catch (err) {
        console.error('Error loading library:', err);
        setError('Failed to load your library.');
      } finally {
        setLoading(false);
      }
    };

    fetchLibrary();
  }, []);

  return (
    <div className="flex-1 bg-gray-900 p-8 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Library className="w-6 h-6" />
        <span>Your Library</span>
      </h1>

      {loading && <div className="text-gray-300 text-sm">Loading library...</div>}
      {error && <div className="text-red-400 text-sm mb-4">{error}</div>}

      {!loading && !error && (
        <>
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Disc3 className="w-5 h-5 text-gray-300" />
              <h2 className="text-xl font-semibold">Albums</h2>
            </div>
            {albums.length === 0 ? (
              <p className="text-gray-400 text-sm">No albums yet.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {albums.map((album) => (
                  <div
                    key={album._id}
                    className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    <img
                      src={
                        album.coverImage ||
                        'https://picsum.photos/seed/library-album/200/200.jpg'
                      }
                      alt={album.title}
                      className="w-full aspect-square object-cover rounded-md mb-3"
                    />
                    <h3 className="font-semibold text-white truncate">{album.title}</h3>
                    <p className="text-sm text-gray-400 truncate">{album.artist}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <ListMusic className="w-5 h-5 text-gray-300" />
              <h2 className="text-xl font-semibold">Playlists</h2>
            </div>
            {playlists.length === 0 ? (
              <p className="text-gray-400 text-sm">No playlists yet.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {playlists.map((playlist) => (
                  <div
                    key={playlist._id}
                    className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    <div className="h-32 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-md mb-3 flex items-center justify-center">
                      <ListMusic className="w-10 h-10 text-green-400" />
                    </div>
                    <h3 className="font-semibold text-white truncate">{playlist.name}</h3>
                    <p className="text-sm text-gray-400 truncate">
                      {playlist.songs?.length || 0} songs
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default LibraryView;
