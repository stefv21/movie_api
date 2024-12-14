const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


let movieSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genre: {
    name: { type: String, required: true },
    description: { type: String, required: true }
  },
  director: {
    name: { type: String, required: true },
    bio: { type: String, required: true },
    birthyear: { type: Number },
    deathyear: { type: Number } // Optional year as a number
  },
  imageURL: { type: String, default: '' }, // Optional with default empty string
  featured: { type: Boolean, default: false }, // Optional with default value 'false'
  releaseYear: { type: Number }, // Optional
  runtime: { type: Number } // Optional
});




let userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  birthday: Date,
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





  
  