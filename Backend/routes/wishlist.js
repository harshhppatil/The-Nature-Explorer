const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Place = require('../models/Place');
const protect = require('../middleware/authMiddleware');

// All wishlist routes require login
router.use(protect);

// GET /wishlist — get all saved places for logged-in user
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('savedPlaces'); // 👈 replaces IDs with full place objects
    
    res.json({
      count: user.savedPlaces.length,
      savedPlaces: user.savedPlaces
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /wishlist/:placeId — save a place
router.post('/:placeId', async (req, res) => {
  try {
    const { placeId } = req.params;

    // Check if place exists
    const place = await Place.findById(placeId);
    if (!place) return res.status(404).json({ error: 'Place not found' });

    const user = await User.findById(req.user.id);

    // Check if already saved
    if (user.savedPlaces.includes(placeId)) {
      return res.status(400).json({ error: 'Place already in wishlist' });
    }

    user.savedPlaces.push(placeId);
    await user.save();

    res.json({ message: 'Place saved to wishlist ✅', savedPlaces: user.savedPlaces });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /wishlist/:placeId — remove a place
router.delete('/:placeId', async (req, res) => {
  try {
    const { placeId } = req.params;

    const user = await User.findById(req.user.id);

    // Check if it's actually saved
    if (!user.savedPlaces.includes(placeId)) {
      return res.status(400).json({ error: 'Place not in your wishlist' });
    }

    user.savedPlaces = user.savedPlaces.filter(
      id => id.toString() !== placeId
    );
    await user.save();

    res.json({ message: 'Place removed from wishlist 🗑️', savedPlaces: user.savedPlaces });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
