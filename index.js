const mongoose = require('mongoose');
require('dotenv').config();
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

const express = require('express');
const morgan = require('morgan'); 
const cors = require('cors');
const app = express();
const { check, validationResult } = require('express-validator');

// Middleware
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static('public'));

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Test endpoint working' });
});

// Welcome route
app.get('/', (req, res) => {
    res.send('Welcome to my Movie API! Here you can find a list of my top 10 movies.');
});

// CORS example route
app.get('/example', (req, res) => {
    res.send('CORS is enabled for all domains!');
});

// Database connection
(async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true
    });
    console.log('Database connected');
  } catch (err) {
    console.error('Database connection error:', err);
  }
})();

// Create new user
app.post('/users', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Email is not valid').isEmail(),
  check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
  check('birthday', 'Birthday must be a valid date').optional().isDate()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let hashedPassword = Users.hashPassword(req.body.password);

  try {
    const existingUser = await Users.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: `${req.body.email} already exists`, status: 'error' });
    }

    const user = await Users.create({
      name: req.body.name,
      password: hashedPassword,
      email: req.body.email,
      birthday: req.body.birthday,
      address: req.body.address
    });

    res.status(201).json({ message: 'User created successfully', status: 'success', user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', status: 'error' });
  }
});

// Create new movie
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
        Name: Genre.Name,
        Description: Genre.Description
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

// User login
app.post('/login', async (req, res) => {
  const { Username, Password } = req.body;
  
  try {
    const user = await Users.findOne({ Username });
    if (!user) {
      return res.status(400).send('User not found');
    }

    const isMatch = await user.comparePassword(Password);
    if (!isMatch) {
      return res.status(400).send('Invalid password');
    }

    res.status(200).send('Login successful');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
});

// Get all users
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

// Get user by username
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

// Get all movies
app.get('/movies', async (req, res) => {
  console.log('Movies route accessed');
  try {
      const movies = await Movies.find();
      console.log('movies', movies);
      console.log('Movies', Movies);
      console.log('CollectionName', Movies.collection.collectionName);
      res.status(200).json(movies)
  } catch (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
  }
});

// Get movie by ID
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

// Update user
app.put('/users/:Username', async (req, res) => {
  const { Password, Email, Birthday } = req.body;
  try {
      const user = await Users.findOneAndUpdate(
          { Username: req.params.Username },
          { Password, Email, Birthday },
          { new: true }
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

// Update movie
app.put('/movies/:id', async (req, res) => {
  const { Title, Genre, Description } = req.body;
  try {
      const movie = await Movies.findByIdAndUpdate(
          req.params.id,
          { Title, Genre, Description },
          { new: true }
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

// Delete user
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

// Delete movie
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

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err); 
    res.status(500).send('Something went wrong!'); 
});

// Start server
const port = process.env.PORT || 8080;
app.listen(port,() => {
 console.log('Listening on Port ' + port);
});

// Auth (moved to end)
require('./auth')(app);