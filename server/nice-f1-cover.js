require('dotenv').config();
const mongoose = require('mongoose');
const Song = require('./models/Song');
const Album = require('./models/Album');
const connectDB = require('./config/db');

const addNiceF1Cover = async () => {
  try {
    await connectDB();

    // Use a nice racing/F1 themed image
    const niceCoverUrl = 'https://picsum.photos/seed/f1-racing-2024/300/300.jpg';

    await Song.updateOne(
      { title: 'F1 Track' },
      { $set: { imageUrl: niceCoverUrl } }
    );

    await Album.updateOne(
      { title: 'Custom Album' },
      { $set: { coverImage: niceCoverUrl } }
    );

    console.log('✅ Added nice F1-themed cover image!');
    console.log('This should display immediately and work reliably');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

addNiceF1Cover();
