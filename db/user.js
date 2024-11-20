const mongoose = require('mongoose');

// Define the User Schema with favorites
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]  // Array of movie references
});

// Create the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
