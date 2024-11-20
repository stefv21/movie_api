const mongoose = require('mongoose');

// Define the Movie Schema
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  director: { type: String, required: true },
  releaseYear: { type: Number },
  imageURL: { type: String },
  featured: { type: Boolean, default: false }
});

// Create the Movie model
const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
