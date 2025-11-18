require('dotenv').config();
const mongoose = require('mongoose');
const Song = require('./models/Song');
const Album = require('./models/Album');
const connectDB = require('./config/db');

const fixF1Cover = async () => {
  try {
    await connectDB();

    // Use an F1-themed image
    const f1CoverUrl = 'https://picsum.photos/seed/formula1-racing/300/300.jpg';

    await Song.updateOne(
      { title: 'F1 Track' },
      { $set: { imageUrl: f1CoverUrl } }
    );

    await Album.updateOne(
      { title: 'Custom Album' },
      { $set: { coverImage: f1CoverUrl } }
    );

    console.log('✅ Updated with F1-themed cover image');
    console.log('This should display immediately');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

fixF1Cover();
