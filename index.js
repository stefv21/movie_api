const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/db', { useNewUrlParser: true, useUnifiedTopology: true });

const express = require('express');
const morgan = require('morgan'); 
const app = express();
const PORT = 8080;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Use Morgan middleware to log requests
app.use(morgan('dev'));


app.use(express.static('public'));


app.get('/', (req, res) => {
    res.send('Welcome to my Movie API! Here you can find a list of my top 10 movies.');
});


//
//Add a user
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
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

//

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

  // 

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


  
app.get('/movies', (req, res) => {
    res.json({
        movies: [
            "Top Gun",
            "The Little Mermaid",
            "Barbie (2024)",
            "Twisters",
            "The Notebook",
            "Titanic",
            "Pretty Woman",
            "How to Lose a Guy in 10 Days",
            "Pretty in Pink",
            "Anyone But You",
            "The Wedding Planner"
        ]
    });
});


app.use((err, req, res, next) => {
    console.error('Error:', err); 
    res.status(500).send('Something went wrong!'); 
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


