const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const movieSchema = new mongoose.Schema({
  Title: { type: String, required: true },  // Updated to match database field name
  Description: String,                      // Updated to match database field name
  Genre: {
    Name: { type: String, required: true }, // Updated to match database field name
    Description: String                     // Updated to match database field name
  },
  Director: {
    Name: { type: String, required: true }, // Updated to match database field name
    Bio: String,                            // Updated to match database field name
    Birth: String,                          // Updated to match database field name
    Death: String                           // Updated to match database field name
  },
  ImagePath: String,                       // Updated to match database field name
  Featured: Boolean                        // Updated to match database field name
});





let userSchema = mongoose.Schema({
  username: { type: String, required: true }, // Changed from username to name
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





  
  