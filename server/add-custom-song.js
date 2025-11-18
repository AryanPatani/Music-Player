require('dotenv').config();
const mongoose = require('mongoose');
const Song = require('./models/Song');
const Album = require('./models/Album');
const connectDB = require('./config/db');

const addCustomSong = async () => {
  try {
    await connectDB();

    // Create a new album for your song
    const newAlbum = new Album({
      title: 'Custom Album',
      artist: 'Custom Artist',
      coverImage: 'https://picsum.photos/seed/custom-album/300/300.jpg'
    });

    const savedAlbum = await newAlbum.save();

    // Create the new song
    const newSong = new Song({
      title: 'F1 Track',
      artist: 'Custom Artist',
      album: savedAlbum._id,
      audioUrl: 'http://localhost:5000/audio/F1.mp3',
      duration: 240, // You can adjust this based on actual duration
      imageUrl: 'https://picsum.photos/seed/f1-track/100/100.jpg'
    });

    const savedSong = await newSong.save();

    // Update album with the song reference
    savedAlbum.songs = [savedSong._id];
    await savedAlbum.save();

    console.log('✅ Custom song added successfully!');
    console.log(`Song: ${savedSong.title}`);
    console.log(`Album: ${savedAlbum.title}`);
    console.log(`Audio URL: ${savedSong.audioUrl}`);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error adding custom song:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

addCustomSong();
