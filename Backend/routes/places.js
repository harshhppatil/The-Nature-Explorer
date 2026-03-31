const express = require('express');
const router = express.Router();
const Place = require('../models/Place');
const protect = require('../middleware/authMiddleware'); // 👈 import middleware

// PUBLIC routes — anyone can view
router.get('/', async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ error: 'Place not found' });
    res.json(place);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PROTECTED routes — must be logged in
router.post('/', protect, async (req, res) => {
  try {
    const place = new Place({
      ...req.body,
      createdBy: req.user.id  // 👈 attach logged-in user's ID
    });
    await place.save();
    res.status(201).json(place);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const place = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!place) return res.status(404).json({ error: 'Place not found' });
    res.json(place);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id);
    if (!place) return res.status(404).json({ error: 'Place not found' });
    res.json({ message: 'Place deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
