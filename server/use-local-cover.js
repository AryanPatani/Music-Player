require('dotenv').config();
const mongoose = require('mongoose');
const Song = require('./models/Song');
const Album = require('./models/Album');
const connectDB = require('./config/db');

const useLocalCover = async () => {
  try {
    await connectDB();

    // Update to use your local cover image
    const localCoverUrl = 'http://localhost:5000/images/F1-Cover.jpeg';

    await Song.updateOne(
      { title: 'F1 Track' },
      { $set: { imageUrl: localCoverUrl } }
    );

    await Album.updateOne(
      { title: 'Custom Album' },
      { $set: { coverImage: localCoverUrl } }
    );

    console.log('✅ Updated to use your local cover image!');
    console.log('Song and album now use: http://localhost:5000/images/F1-Cover.jpeg');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

useLocalCover();
