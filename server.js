const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

app.use(bodyParser.json());

let users = [
  {
    id: 1,
    name:"Mary",
    favoriteMovies: []
  },

  {
    id: 2, 
    name: "Sam",
    favoriteMovies:["Top Gun"]
  },
]


let movies = [
  {
    Title: "Top Gun",
    Description: "A modern action movie about elite naval aviators.",
    Genre: { Name: "Action" },
    Director: { Name: "Tony Scott" }
  },
  {
    Title: "The Little Mermaid",
    Description: "A Disney animated classic about a young mermaid's adventures.",
    Genre: { Name: "Fantasy" },
    Director: { Name: "Ron Clements" }
  },
  {
    Title: "Barbie (2024)",
    Description: "A live-action adaptation that explores Barbie's world and adventures.",
    Genre: { Name: "Adventure" },
    Director: { Name: "Greta Gerwig" }
  },
  {
    Title: "Twisters",
    Description: "A thrilling movie about storm chasers facing nature's wrath.",
    Genre: { Name: "Drama" },
    Director: { Name: "Jan de Bont" }
  },
  {
    Title: "The Notebook",
    Description: "A romantic drama about a love story that transcends time.",
    Genre: { Name: "Romance" },
    Director: { Name: "Nick Cassavetes" }
  },
  {
    Title: "Titanic",
    Description: "A historical romance set against the tragic sinking of the Titanic.",
    Genre: { Name: "Romance" },
    Director: { Name: "James Cameron" }
  },
  {
    Title: "Pretty Woman",
    Description: "A romantic comedy about a chance encounter that changes two lives.",
    Genre: { Name: "Romantic Comedy" },
    Director: { Name: "Garry Marshall" }
  },
  {
    Title: "How to Lose a Guy in 10 Days",
    Description: "A humorous tale about a woman writing an article on dating gone wrong.",
    Genre: { Name: "Romantic Comedy" },
    Director: { Name: "Donald Petrie" }
  },
  {
    Title: "Pretty in Pink",
    Description: "A coming-of-age story about love and social class differences.",
    Genre: { Name: "Romantic Comedy" },
    Director: { Name: "Howard Deutch" }
  },
  {
    Title: "Anyone But You",
    Description: "A romantic comedy about two people who seem mismatched in every way.",
    Genre: { Name: "Romantic Comedy" },
    Director: { Name: "Will Gluck" }
  },
  {
    Title: "The Wedding Planner",
    Description: "A romantic comedy about a wedding planner who finds herself falling for the groom.",
    Genre: { Name: "Romantic Comedy" },
    Director: { Name: "Adam Shankman" }
  }
];

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
  const movie = movies.find (movie => movie.Genre.Name === genreName);
  
  if (movie) {
    res.status(200).json (movie.Genre);
  } else {
    res.status(400).send('no such genre')
  }
  
  })


  //Read
app.get ('/movies/directors/:directorName', (req,res) => {
  const { directorName } = req.params;
  const movie = movies.find (movie => movie.Director.Name === directorName);
  
  if (movie) {
    res.status(200).json (movie.Director);
  } else {
    res.status(400).send('no such director')
  }
  
  })





// CREATE
app.post('/users', (req,res) => {
  // Basic CSRF protection - check origin
  const origin = req.get('Origin') || req.get('Referer');
  const allowedOrigins = ['http://localhost:3000', 'https://myflixapp-0225.netlify.app', 'https://stefv21.github.io'];
  
  if (origin && !allowedOrigins.some(allowed => origin.startsWith(allowed))) {
    return res.status(403).json({ message: 'Forbidden origin' });
  }
  
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
// Basic CSRF protection - check origin
const origin = req.get('Origin') || req.get('Referer');
const allowedOrigins = ['http://localhost:3000', 'https://myflixapp-0225.netlify.app', 'https://stefv21.github.io'];

if (origin && !allowedOrigins.some(allowed => origin.startsWith(allowed))) {
  return res.status(403).json({ message: 'Forbidden origin' });
}

const { id } = req.params;
const updatedUser = req.body;

let user = users.find( user => user.id == id);

if (user) {
  user.name = updatedUser.name;
  res.status(200).json (user);

} else { 
    res.status(400).send('no such user')
  }
})


// CREATE
app.post('/users/:id/:movieTitle', (req, res) => {
  // Basic authentication check
  const authHeader = req.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  const { id, movieTitle } = req.params;
  
  let user = users.find( user => user.id == id);
  
  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user $ {id}'s array`);;
  
  } else { 
      res.status(400).send('no such user')
    }
  })


  // DELETE
app.delete('/users/:id/:movieTitle', (req, res) => {
  // Basic CSRF protection - check origin
  const origin = req.get('Origin') || req.get('Referer');
  const allowedOrigins = ['http://localhost:3000', 'https://myflixapp-0225.netlify.app', 'https://stefv21.github.io'];
  
  if (origin && !allowedOrigins.some(allowed => origin.startsWith(allowed))) {
    return res.status(403).json({ message: 'Forbidden origin' });
  }
  
  const { id, movieTitle } = req.params;
  
  let user = users.find( user => user.id == id);
  
  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
    res.status(200).send(`${movieTitle} has been removed from user $ {id}'s array`);;
  
  } else { 
      res.status(400).send('no such user')
    }
  })




  // DELETE
app.delete('/users/:id', (req, res) => {
  // Basic CSRF protection - check origin
  const origin = req.get('Origin') || req.get('Referer');
  const allowedOrigins = ['http://localhost:3000', 'https://myflixapp-0225.netlify.app', 'https://stefv21.github.io'];
  
  if (origin && !allowedOrigins.some(allowed => origin.startsWith(allowed))) {
    return res.status(403).json({ message: 'Forbidden origin' });
  }
  
  const { id } = req.params;
  
  let user = users.find( user => user.id == id);
  
  if (user) {
    users = users.filter( user => user.id != id);
    res.status(200).send(`user ${id} has been deleted`);;
  
  } else { 
      res.status(400).send('no such user')
    }
  })

  app.listen(8080, () => console.log ("listening on 8080"))




 
