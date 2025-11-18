require('dotenv').config();
const mongoose = require('mongoose');
const Song = require('./models/Song');
const Album = require('./models/Album');
const Playlist = require('./models/Playlist');
const connectDB = require('./config/db');

const seedData = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Clear existing data
    await Song.deleteMany({});
    await Album.deleteMany({});
    await Playlist.deleteMany({});

    // Create albums
    const album1 = new Album({
      title: 'Midnight Dreams',
      artist: 'Luna Rose',
      coverImage: 'https://picsum.photos/seed/album1/300/300.jpg'
    });

    const album2 = new Album({
      title: 'Electric Vibes',
      artist: 'Neon Pulse',
      coverImage: 'https://picsum.photos/seed/album2/300/300.jpg'
    });

    await album1.save();
    await album2.save();

    // Create songs
    const songs = [
      {
        title: 'Starlight',
        artist: 'Luna Rose',
        album: album1._id,
        audioUrl: 'http://localhost:5000/audio/01. The Weeknd - Blinding Lights.flac.mp3',
        duration: 240,
        imageUrl: 'https://picsum.photos/seed/song1/100/100.jpg'
      },
      {
        title: 'Moonbeam',
        artist: 'Luna Rose',
        album: album1._id,
        audioUrl: 'http://localhost:5000/audio/01 - Zankoku na Tenshi no TE-ZE _Yoko Takahashi_.flac',
        duration: 195,
        imageUrl: 'https://picsum.photos/seed/song2/100/100.jpg'
      },
      {
        title: 'Night Sky',
        artist: 'Luna Rose',
        album: album1._id,
        audioUrl: 'http://localhost:5000/audio/MYTH  ROID - STYX HELIX.flac',
        duration: 210,
        imageUrl: 'https://picsum.photos/seed/song3/100/100.jpg'
      },
      {
        title: 'Neon Lights',
        artist: 'Neon Pulse',
        album: album2._id,
        audioUrl: 'http://localhost:5000/audio/Miki Matsubara - __30495___22812___20013___12398___12489___12450_Stay With Me.flac',
        duration: 180,
        imageUrl: 'https://picsum.photos/seed/song4/100/100.jpg'
      },
      {
        title: 'Electric Feel',
        artist: 'Neon Pulse',
        album: album2._id,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        duration: 225,
        imageUrl: 'https://picsum.photos/seed/song5/100/100.jpg'
      }
    ];

    const savedSongs = await Song.insertMany(songs);

    // Update albums with song references
    album1.songs = savedSongs.slice(0, 3).map(song => song._id);
    album2.songs = savedSongs.slice(3, 5).map(song => song._id);

    await album1.save();
    await album2.save();

    // Create playlists
    const playlist1 = new Playlist({
      name: 'My Favorites',
      user: 'demo_user',
      songs: savedSongs.slice(0, 3).map(song => song._id)
    });

    const playlist2 = new Playlist({
      name: 'Chill Vibes',
      user: 'demo_user',
      songs: savedSongs.slice(2, 5).map(song => song._id)
    });

    await playlist1.save();
    await playlist2.save();

    console.log('Database seeded successfully!');
    console.log(`Created ${savedSongs.length} songs`);
    console.log('Created 2 albums');
    console.log('Created 2 playlists');

    // Close DB connection
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedData();
