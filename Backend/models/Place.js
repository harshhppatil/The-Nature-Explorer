const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Park', 'River', 'Lake', 'Mountain', 'Wildlife'],
    required: true 
  },
  description: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String },
  bestTimeToVisit: { type: String },
  entryFee: { type: String },
  rating: { type: Number, min: 0, max: 5 }
}, { timestamps: true });

module.exports = mongoose.model('Place', placeSchema);
