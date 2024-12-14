const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: {
    Name: { type: String, required: true },
    Description: { type: String, required: true }
  },
  Director: {
    Name: { type: String, required: true },
    Bio: { type: String, required: true },
    Birth: { type: String },
    Death: { type: String }
  },
  ImagePath: { type: String },
  Featured: { type: Boolean },
  ReleaseYear: { type: Number },
  Runtime: { type: Number }
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





  
  