require('dotenv').config();
const mongoose = require('mongoose');
const Song = require('./models/Song');
const Album = require('./models/Album');
const connectDB = require('./config/db');

const fixCover = async () => {
  try {
    await connectDB();

    // Use a working online image temporarily
    const tempCoverUrl = 'https://picsum.photos/seed/f1-racing/300/300.jpg';

    await Song.updateOne(
      { title: 'F1 Track' },
      { $set: { imageUrl: tempCoverUrl } }
    );

    await Album.updateOne(
      { title: 'Custom Album' },
      { $set: { coverImage: tempCoverUrl } }
    );

    console.log('✅ Updated with temporary online cover image');
    console.log('This should work immediately');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

fixCover();
