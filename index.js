const mongoose = require('mongoose');
require('dotenv').config();
const Models = require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;
const passport = require('passport');



const express = require('express');
const app = express();
const allowedOrigins = ["http://localhost:3000"];

const morgan = require('morgan'); 
const cors = require('cors');
app.use(cors());


const { check, validationResult } = require('express-validator');


const uri = process.env.CONNECTION_URI;

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
    } else {
      callback(new Error("The CORS policy for this application doesn’t allow access from origin " + origin));
    }
  }
}));



require('./passport');

app.get('/', (req, res) => {
    res.send('Welcome to my Movie API! Here you can find a list of my top 10 movies.');
});


app.get('/test', (req, res) => {
  res.json({ message: 'Test endpoint working' });
});



//
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



//READ

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

// Read: Get all movies

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


// Read: Get a movie by ID
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



//UPDATE
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





// DELETE
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

