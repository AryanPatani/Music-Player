import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { togglePlayPause, nextSong, previousSong, setVolume } from '../store/playerSlice';

const PlayerBar = () => {
  const dispatch = useDispatch();
  const { currentSong, isPlaying, progress, volume } = useSelector((state) => state.player);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentTimeSeconds = currentSong
    ? (currentSong.duration || 0) * (progress || 0)
    : 0;

  return (
    <div className="h-24 bg-gray-900 border-t border-gray-800 px-4 flex items-center justify-between">
      <div className="flex items-center gap-4 w-1/3">
        {currentSong ? (
          <>
            <img 
              src={currentSong.imageUrl || 'https://picsum.photos/seed/player/50/50.jpg'} 
              alt={currentSong.title}
              className="w-14 h-14 object-cover rounded"
            />
            <div>
              <h4 className="text-sm font-medium text-white">{currentSong.title}</h4>
              <p className="text-xs text-gray-400">{currentSong.artist}</p>
            </div>
          </>
        ) : (
          <div className="text-gray-500 text-sm">No song selected</div>
        )}
      </div>
      
      <div className="flex flex-col items-center gap-2 flex-1">
        <div className="flex items-center gap-6">
          <button 
            className="text-gray-400 hover:text-white transition-colors"
            onClick={() => dispatch(previousSong())}
          >
            <SkipBack className="w-5 h-5" />
          </button>
          <button 
            className="bg-white text-black rounded-full p-2 hover:scale-105 transition-transform"
            onClick={() => dispatch(togglePlayPause())}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" fill="currentColor" />
            ) : (
              <Play className="w-5 h-5" fill="currentColor" />
            )}
          </button>
          <button 
            className="text-gray-400 hover:text-white transition-colors"
            onClick={() => dispatch(nextSong())}
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center gap-2 w-full max-w-md">
          <span className="text-xs text-gray-400">
            {currentSong ? formatTime(currentTimeSeconds) : '0:00'}
          </span>
          <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${(progress || 0) * 100}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-400">
            {currentSong ? formatTime(currentSong.duration) : '0:00'}
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 w-1/3 justify-end">
        <Volume2 className="w-5 h-5 text-gray-400" />
        <input
          type="range"
          min="0"
          max="100"
          value={Math.round((volume || 0) * 100)}
          onChange={(e) => dispatch(setVolume(Number(e.target.value) / 100))}
          className="w-24"
        />
      </div>
    </div>
  );
};

export default PlayerBar;
