import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProgress, nextSong } from '../store/playerSlice';

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const dispatch = useDispatch();
  const { currentSong, isPlaying, volume } = useSelector((state) => state.player);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume ?? 0.7;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!currentSong || !currentSong.audioUrl) {
      audio.pause();
      return;
    }

    audio.src = currentSong.audioUrl;

    if (isPlaying) {
      audio
        .play()
        .catch((error) => {
          console.error('Error playing audio:', error);
        });
    } else {
      audio.pause();
    }
  }, [currentSong, isPlaying]);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    const { currentTime, duration } = audio;
    if (!duration || Number.isNaN(duration)) {
      dispatch(setProgress(0));
      return;
    }

    const progress = currentTime / duration;
    dispatch(setProgress(progress));
  };

  const handleEnded = () => {
    dispatch(nextSong());
  };

  return (
    <audio
      ref={audioRef}
      className="hidden"
      onTimeUpdate={handleTimeUpdate}
      onEnded={handleEnded}
    />
  );
};

export default AudioPlayer;
