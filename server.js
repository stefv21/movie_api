const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

app.use(bodyParser.json());

let users = [
  {
    id: 1,
    name:"Mary",
    favoriteMovie: []
  },

  {
    id: 2, 
    name: "Sam",
    favoriteMovie:["Top Gun"]
  },
]


let movies = [
  {
  "Title":"Top Gun",
  "Description": "A modern action movie",
  "Genre": {"Name":"Action"},
  
  
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
  },
  
  ];





// CREATE
app.post('/users', (req,res) => {
  const newUser = req.body;
  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser)

  } else {
    res.status(400).send('users need names')
  }
 
})


// UPDATE
app.put('/users/:id', (req, res) =>{
const { id } = req.params;
const updatedUser = req.body;

let user = users.find( user => user.id == id);

if (user) {
  user.name = updateUser.name;
  res.status(200).json (user);

} else { 
    req.status(400).send('no such user')
  }
})


// CREATE
app.post('/users/:id/movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;
  
  let user = users.find( user => user.id == id);
  
  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieName} has been added to user $ {id}'s array`);;
  
  } else { 
      req.status(400).send('no such user')
    }
  })


  // DELETE
app.delete('/users/:id/movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;
  
  let user = users.find( user => user.id == id);
  
  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
    res.status(200).send(`${movieTitle} has been removed from user $ {id}'s array`);;
  
  } else { 
      req.status(400).send('no such user')
    }
  })




  // DELETE
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  
  let user = users.find( user => user.id == id);
  
  if (user) {
    users = user.filter( user => user.id != id);
    res.status(200).send(`user ${id} has been deleted`);;
  
  } else { 
      req.status(400).send('no such user')
    }
  })




// READ
app.get ('/movies', (req,res) => {
res.status(200).json(movies);

})

// READ
app.get ('/movies/:title', (req,res) => {
const { title } = req.params;
const movie = movies.find (movie => movie.Title === title ); 

if (movie) {
  res.status(200).json (movie);
} else {
  res.status(400).send('no such movie')
}

})

//Read
app.get ('/movies/genre/:genreName', (req,res) => {
  const { genreName } = req.params;
  const genre = movies.find (movie => movie.Genre.Name === genreName ).Genre;
  
  if (genre) {
    res.status(200).json (genre);
  } else {
    res.status(400).send('no such movie')
  }
  
  })

//Read
app.get ('/movies/directors/:directorName', (req,res) => {
  const { directorname } = req.params;
  const director = movies.find (movie => movie.Director.Name === directorName ).Director;
  
  if (genre) {
    res.status(200).json (director);
  } else {
    res.status(400).send('no such director')
  }
  
  })

 
