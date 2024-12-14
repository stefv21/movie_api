const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  genre: {
    name: String,
    description: String
  },
  director: {
    name: String,
    bio: String,
    birthyear: String,
    deathyear: String
  },
  imageURL: String,
  featured: Boolean,
  releaseYear: Number,
  runtime: Number
});






let userSchema = mongoose.Schema({
  name: { type: String, required: true }, // Changed from username to name
  password: { type: String, required: true },
  email: { type: String, required: true },
  birthday: { type: Date },
  address: { type: String }, // Added the address field
  favoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});



userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};



let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;





  
  