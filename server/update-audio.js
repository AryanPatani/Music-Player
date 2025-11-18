require('mongoose').connect('mongodb://localhost:27017/music-streaming').then(async () => {
  const Song = require('./models/Song');
  
  // Update all songs with working audio URLs
  const audioUrls = [
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'
  ];
  
  const songs = await Song.find();
  for (let i = 0; i < songs.length; i++) {
    await Song.findByIdAndUpdate(songs[i]._id, {
      audioUrl: audioUrls[i]
    });
  }
  
  console.log('Updated all songs with working audio URLs');
  process.exit(0);
}).catch(e => {
  console.log('Error:', e.message);
  process.exit(1);
});
