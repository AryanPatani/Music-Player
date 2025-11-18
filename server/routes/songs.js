const express = require('express');
const router = express.Router();
const Song = require('../models/Song');

// GET /api/songs/search - Search songs
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const songs = await Song.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { artist: { $regex: q, $options: 'i' } }
      ]
    }).populate('album');

    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/songs - Get all songs
router.get('/', async (req, res) => {
  try {
    const songs = await Song.find().populate('album');
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/songs/:id - Get song by ID
router.get('/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id).populate('album');
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.json(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
