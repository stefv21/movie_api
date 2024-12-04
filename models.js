const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


let movieSchema = mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  genre: String,
    
  director: String,
 
  imageURL: String,
  featured: Boolean
});





let userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  birthday: Date,
  favoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // Only hash if password is new or modified

  try {
    const salt = await bcrypt.genSalt(10); // Create a salt
    this.password = await bcrypt.hash(this.password, salt); // Hash password
    next();
  } catch (err) {
    next(err);
  }
});

// Compare password during login
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};



let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;





  
  