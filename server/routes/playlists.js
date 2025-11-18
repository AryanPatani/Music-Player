const express = require('express');
const router = express.Router();
const Playlist = require('../models/Playlist');

// GET /api/playlists - Get all playlists
router.get('/', async (req, res) => {
  try {
    const playlists = await Playlist.find().populate('songs');
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/playlists/:id - Get playlist by ID
router.get('/:id', async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id).populate('songs');
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/playlists - Create new playlist
router.post('/', async (req, res) => {
  try {
    const playlist = new Playlist(req.body);
    const savedPlaylist = await playlist.save();
    res.status(201).json(savedPlaylist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
