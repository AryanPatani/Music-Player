const express = require('express');
const router = express.Router();
const Album = require('../models/Album');

// GET /api/albums - Get all albums
router.get('/', async (req, res) => {
  try {
    const albums = await Album.find().populate('songs');
    res.json(albums);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/albums/:id - Get album by ID
router.get('/:id', async (req, res) => {
  try {
    const album = await Album.findById(req.params.id).populate('songs');
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }
    res.json(album);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
