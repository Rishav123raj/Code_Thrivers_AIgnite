const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  name: String,
  shoppingFrequency: String,
  dietaryPreference: String,
  budget: Number,
  categoryPriorities: [String],
  packaging: String
});

module.exports = mongoose.model('UserProfile', userProfileSchema);
