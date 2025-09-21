const mongoose = require('mongoose');
require('dotenv').config();
const Models = require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;
const passport = require('passport');



const express = require('express');
const app = express();
const allowedOrigins = ["http://localhost:3000", "https://stefv21.github.io/myFlix-Angular-client/"];

const morgan = require('morgan'); 
const cors = require('cors');
app.use(cors());


const { check, validationResult } = require('express-validator');


const uri = process.env.CONNECTION_URI;

/**
 * Connects to MongoDB database
 * @async
 * @function connectDB
 * @returns {Promise<void>}
 */
async function connectDB() {
  try {
    await mongoose.connect(uri, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection error:', err);
  }
}

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static('public'));


const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
};


app.use(cors({
  origin: function(origin, callback) {
    console.log("Request origin:", origin);
    // Allow requests with no origin (like curl, postman)
    if (!origin) return callback(null, true);

    // Allow if the origin includes your Netlify base domain
    if (origin.indexOf("myflixapp-0225.netlify.app") !== -1) {
      callback(null, true);
    } else if (origin.indexOf("stefv21.github.io/myFlix-Angular-client") !== -1) {
      callback(null, true);
    } else {
      callback(new Error("The CORS policy for this application doesn’t allow access from origin " + origin));
    }
  }
}));



require('./passport');

/**
 * Welcome endpoint - Returns welcome message
 * @route GET /
 * @returns {string} 200 - Welcome message
 * @example
 * // Response:
 * "Welcome to my Movie API! Here you can find a list of my top 10 movies."
 */
app.get('/', (req, res) => {
    res.send('Welcome to my Movie API! Here you can find a list of my top 10 movies.');
});

/**
 * Test endpoint - Returns test message
 * @route GET /test
 * @returns {Object} 200 - Test response object
 * @example
 * // Response:
 * {
 *   "message": "Test endpoint working"
 * }
 */
app.get('/test', (req, res) => {
  res.json({ message: 'Test endpoint working' });
});

/**
 * Register a new user
 * @route POST /users
 * @param {string} username.body.required - Username (min 1 character)
 * @param {string} email.body.required - Valid email address
 * @param {string} password.body.required - Password (min 6 characters)
 * @param {string} birthday.body.optional - Date of birth (YYYY-MM-DD)
 * @param {string} address.body.optional - User address
 * @returns {Object} 201 - User creation success
 * @returns {Object} 400 - Validation error or user exists
 * @returns {Object} 500 - Server error
 * @example
 * // Request body:
 * {
 *   "username": "john_doe",
 *   "email": "john@example.com",
 *   "password": "password123",
 *   "birthday": "1990-01-01"
 * }
 * @example
 * // Response:
 * {
 *   "message": "User created successfully",
 *   "status": "success",
 *   "user": {
 *     "username": "john_doe",
 *     "email": "john@example.com"
 *   }
 * }
 */
app.post('/users', [
  check('username', 'Username is required').not().isEmpty(),
  check('email', 'Email is not valid').isEmail(),
  check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
  check('birthday', 'Birthday must be a valid date').optional().isDate()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let hashedPassword = Users.hashPassword(req.body.password); // Corrected to match validation

  try {
    const existingUser = await Users.findOne({ email: req.body.email }); // Corrected to use 'email'
    if (existingUser) {
      return res.status(400).json({ message: `${req.body.email} already exists`, status: 'error' });
    }

    const user = await Users.create({
      username: req.body.username,  // Corrected to match schema field
      password: hashedPassword,  // Corrected to match schema field
      email: req.body.email,  // Corrected to match schema field
      birthday: req.body.birthday,  // Corrected to match schema field
      address: req.body.address  // If address is part of the request body
    });

    res.status(201).json({ message: 'User created successfully', status: 'success', user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', status: 'error' });
  }
});

/**
 * Create a new movie
 * @route POST /movies
 * @param {string} Title.body.required - Movie title
 * @param {Object} Genre.body.required - Genre object with Name and Description
 * @param {string} Description.body.required - Movie description
 * @param {Object} Director.body.required - Director object with Name, Bio, Birth, Death
 * @param {string} ImagePath.body.optional - Movie poster image URL
 * @param {boolean} Featured.body.optional - Whether movie is featured
 * @param {number} ReleaseYear.body.optional - Movie release year
 * @param {number} Runtime.body.optional - Movie runtime in minutes
 * @returns {Object} 201 - Created movie object
 * @returns {Object} 500 - Server error
 * @example
 * // Request body:
 * {
 *   "Title": "The Matrix",
 *   "Genre": {
 *     "Name": "Sci-Fi",
 *     "Description": "Science Fiction"
 *   },
 *   "Description": "A computer hacker learns reality is a simulation",
 *   "Director": {
 *     "Name": "The Wachowskis",
 *     "Bio": "Film directors",
 *     "Birth": "1965"
 *   },
 *   "ReleaseYear": 1999
 * }
 */
app.post('/movies', async (req, res) => {
  const { 
    Title, 
    Genre, 
    Description, 
    Director, 
    ImagePath, 
    Featured, 
    ReleaseYear, 
    Runtime 
  } = req.body;

  try {
    const newMovie = await Movies.create({
      Title,
      Genre: {
        Name: Genre.Name,             // Changed to match how it is in the request body
        Description: Genre.Description // Changed to match how it is in the request body
      },
      Description,
      Director: {
        Name: Director.Name,          
        Bio: Director.Bio,            
        Birth: Director.Birth,       
        Death: Director.Death        
      },
      ImagePath,
      Featured,
      ReleaseYear,
      Runtime
    });

    res.status(201).json(newMovie);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
  }
});

/**
 * Get all users
 * @route GET /users
 * @returns {Array} 201 - Array of user objects
 * @returns {Object} 500 - Server error
 * @example
 * // Response:
 * [
 *   {
 *     "username": "john_doe",
 *     "email": "john@example.com",
 *     "birthday": "1990-01-01"
 *   }
 * ]
 */
app.get('/users', async (req, res) => {
    await Users.find()
      .then((users) => {
        res.status(201).json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

/**
 * Get user by username
 * @route GET /users/{Username}
 * @param {string} Username.path.required - Username to retrieve
 * @returns {Object} 200 - User object
 * @returns {Object} 500 - Server error
 * @example
 * // Response:
 * {
 *   "username": "john_doe",
 *   "email": "john@example.com",
 *   "birthday": "1990-01-01"
 * }
 */
app.get('/users/:Username', async (req, res) => {
    await Users.findOne({ Username: req.params.Username })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

/**
 * Get all movies (requires JWT authentication)
 * @route GET /movies
 * @param {string} Authorization.header.required - Bearer JWT token
 * @returns {Array} 200 - Array of movie objects
 * @returns {Object} 401 - Unauthorized
 * @returns {Object} 500 - Server error
 * @example
 * // Request headers:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 * }
 * @example
 * // Response:
 * [
 *   {
 *     "Title": "The Matrix",
 *     "Genre": {
 *       "Name": "Sci-Fi",
 *       "Description": "Science Fiction"
 *     },
 *     "Description": "A computer hacker learns reality is a simulation"
 *   }
 * ]
 */
app.get('/movies', passport.authenticate('jwt', { session: false }), async (req, res) => {
  console.log('Movies route accessed');
  try {
      const movies = await Movies.find();
      console.log('movies', movies);
      console.log('Movies', Movies);
      console.log('CollectionName', Movies.collection.collectionName);

      res.status(200).json(movies);
  } catch (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
  }
});

/**
 * Get movie by ID
 * @route GET /movies/{id}
 * @param {string} id.path.required - Movie ID
 * @returns {Object} 200 - Movie object
 * @returns {string} 404 - Movie not found
 * @returns {Object} 500 - Server error
 * @example
 * // Response:
 * {
 *   "Title": "The Matrix",
 *   "Genre": {
 *     "Name": "Sci-Fi",
 *     "Description": "Science Fiction"
 *   },
 *   "Description": "A computer hacker learns reality is a simulation"
 * }
 */
app.get('/movies/:id', async (req, res) => {
  try {
      const movie = await Movies.findById(req.params.id);
      if (!movie) {
          return res.status(404).send('Movie not found');
      }
      res.status(200).json(movie);
  } catch (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
  }
});

/**
 * Update user by username
 * @route PUT /users/{Username}
 * @param {string} Username.path.required - Username to update
 * @param {string} Password.body.optional - New password
 * @param {string} Email.body.optional - New email
 * @param {string} Birthday.body.optional - New birthday
 * @returns {Object} 200 - Updated user object
 * @returns {string} 404 - User not found
 * @returns {Object} 500 - Server error
 * @example
 * // Request body:
 * {
 *   "Email": "newemail@example.com",
 *   "Birthday": "1991-01-01"
 * }
 * @example
 * // Response:
 * {
 *   "username": "john_doe",
 *   "email": "newemail@example.com",
 *   "birthday": "1991-01-01"
 * }
 */
app.put('/users/:Username', async (req, res) => {
  const { Password, Email, Birthday } = req.body;
  try {
      const user = await Users.findOneAndUpdate(
          { Username: req.params.Username },
          { Password, Email, Birthday },
          { new: true } // To return the updated document
      );
      if (!user) {
          return res.status(404).send('User not found');
      }
      res.status(200).json(user);
  } catch (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
  }
});

/**
 * Update movie by ID
 * @route PUT /movies/{id}
 * @param {string} id.path.required - Movie ID to update
 * @param {string} Title.body.optional - New movie title
 * @param {string} Genre.body.optional - New movie genre
 * @param {string} Description.body.optional - New movie description
 * @returns {Object} 200 - Updated movie object
 * @returns {string} 404 - Movie not found
 * @returns {Object} 500 - Server error
 * @example
 * // Request body:
 * {
 *   "Title": "The Matrix Reloaded",
 *   "Description": "Neo and the rebel leaders estimate 72 hours until Zion falls"
 * }
 */
app.put('/movies/:id', async (req, res) => {
  const { Title, Genre, Description } = req.body;
  try {
      const movie = await Movies.findByIdAndUpdate(
          req.params.id,
          { Title, Genre, Description },
          { new: true } // To return the updated document
      );
      if (!movie) {
          return res.status(404).send('Movie not found');
      }
      res.status(200).json(movie);
  } catch (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
  }
});

/**
 * Delete user by username
 * @route DELETE /users/{Username}
 * @param {string} Username.path.required - Username to delete
 * @returns {string} 200 - Deletion confirmation message
 * @returns {string} 404 - User not found
 * @returns {Object} 500 - Server error
 * @example
 * // Response:
 * "User john_doe deleted"
 */
app.delete('/users/:Username', async (req, res) => {
  try {
      const user = await Users.findOneAndDelete({ Username: req.params.Username });
      if (!user) {
          return res.status(404).send('User not found');
      }
      res.status(200).send(`User ${req.params.Username} deleted`);
  } catch (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
  }
});

/**
 * Delete movie by ID
 * @route DELETE /movies/{id}
 * @param {string} id.path.required - Movie ID to delete
 * @returns {string} 200 - Deletion confirmation message
 * @returns {string} 404 - Movie not found
 * @returns {Object} 500 - Server error
 * @example
 * // Response:
 * "Movie with ID 507f1f77bcf86cd799439011 deleted"
 */
app.delete('/movies/:id', async (req, res) => {
  try {
      const movie = await Movies.findByIdAndDelete(req.params.id);
      if (!movie) {
          return res.status(404).send('Movie not found');
      }
      res.status(200).send(`Movie with ID ${req.params.id} deleted`);
  } catch (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
  }
});




app.use((err, req, res, next) => {
    console.error('Error:', err); 
    res.status(500).send('Something went wrong!'); 
});



const port = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log('Listening on Port ' + port);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to the database:', err);
  });

require('./auth')(app);

