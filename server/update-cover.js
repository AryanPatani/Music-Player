require('dotenv').config();
const mongoose = require('mongoose');
const Song = require('./models/Song');
const Album = require('./models/Album');
const connectDB = require('./config/db');

const updateCover = async () => {
  try {
    await connectDB();

    // Update the song's cover image
    await Song.updateOne(
      { title: 'F1 Track' },
      { 
        $set: { 
          imageUrl: 'http://localhost:5000/images/f1-cover.jpg'
        }
      }
    );

    // Update the album's cover image
    await Album.updateOne(
      { title: 'Custom Album' },
      { 
        $set: { 
          coverImage: 'http://localhost:5000/images/f1-cover.jpg'
        }
      }
    );

    console.log('✅ Cover image updated successfully!');
    console.log('Song and album now use: http://localhost:5000/images/f1-cover.jpg');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error updating cover:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

updateCover();
