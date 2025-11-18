import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { startQueue } from '../store/playerSlice';

const MainContent = () => {
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const albumsResponse = await axios.get('http://localhost:5000/api/albums');
      const songsResponse = await axios.get('http://localhost:5000/api/songs');

      const albumsData = albumsResponse.data;
      const songsData = songsResponse.data;
      
      setAlbums(albumsData);
      setSongs(songsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handlePlaySong = (song, index) => {
    if (!songs || songs.length === 0) return;
    dispatch(startQueue({ queue: songs, index }));
  };

  if (loading) {
    return (
      <div className="flex-1 bg-gray-900 p-8 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-900 p-8 overflow-y-auto">
      <h1 className="text-4xl font-bold mb-8">Good Evening</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Albums</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {albums.map((album) => (
            <div key={album._id} className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
              <img 
                src={album.coverImage || 'https://picsum.photos/seed/album/200/200.jpg'} 
                alt={album.title}
                className="w-full aspect-square object-cover rounded-md mb-4"
              />
              <h3 className="font-semibold text-white truncate">{album.title}</h3>
              <p className="text-sm text-gray-400 truncate">{album.artist}</p>
            </div>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-4">Popular Songs</h2>
        <div className="space-y-2">
          {songs.map((song, index) => (
            <div key={song._id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 transition-colors group">
              <img 
                src={song.imageUrl || 'https://picsum.photos/seed/song/50/50.jpg'} 
                alt={song.title}
                className="w-12 h-12 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="font-medium text-white">{song.title}</h4>
                <p className="text-sm text-gray-400">{song.artist}</p>
              </div>
              <button 
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handlePlaySong(song, index)}
              >
                <Play className="w-8 h-8 text-green-500" fill="currentColor" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainContent;
