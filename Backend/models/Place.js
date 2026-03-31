const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  category: { type: String, enum: ['forest', 'waterfall', 'mountain', 'lake', 'wildlife', 'other'] },
  image: { type: String },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'  // 👈 links to the User model
  }
}, { timestamps: true });

module.exports = mongoose.model('Place', placeSchema);
