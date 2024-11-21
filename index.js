const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;


const express = require('express');
const morgan = require('morgan'); 
const passport = require('passport');
const app = express();
const PORT = 8080;


mongoose.connect('mongodb://localhost:27017/db', { useNewUrlParser: true, useUnifiedTopology: true });


app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static('public'));

app.use(passport.initialize());

let authMiddleware = require('./auth')(passport); // Pass Passport instance to auth.js

app.use('/api/auth', authMiddleware); // Use authentication routes from auth.js


app.get('/', (req, res) => {
    res.send('Welcome to my Movie API! Here you can find a list of my top 10 movies.');
});



// CREATE

app.post('/users', async (req, res) => {
    await Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + 'already exists');
        } else {
          Users
            .create({
              Username: req.body.Username,
              Password: req.body.Password,
              Email: req.body.Email,
              Birthday: req.body.Birthday
            })
            .then((user) =>{res.status(201).json(user) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          })
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  });


  // Create: Add a new movie
app.post('/movies', async (req, res) => {
  const { Title, Genre, Description } = req.body;
  try {
      const newMovie = await Movies.create({ Title, Genre, Description });
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
app.get('/movies', async (req, res) => {
  try {
      const movies = await Movies.find();
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

