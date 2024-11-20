const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/movie_api', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Failed to connect to MongoDB', err));

// Export mongoose for use in other files
module.exports = mongoose;




const mongoose = require('mongoose');

// Connect to MongoDB (replace with your actual MongoDB URI)
mongoose.connect('mongodb://localhost:27017/movie_api', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Define the Movie Schema with Embedded Documents
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  director: {
    name: { type: String, required: true },
    bio: { type: String, required: true },
    birthyear: { type: String, required: true },
    deathyear: { type: String, default: null }
  },
  genre: {
    name: { type: String, required: true },
    description: { type: String, required: true }
  },
  imageURL: { type: String, required: true },
  featured: { type: Boolean, required: true },
  releaseYear: { type: Number, required: true },
  runtime: { type: Number, required: true }
});

// Create a Movie model
const Movie = mongoose.model('Movie', movieSchema);

// Insert movie data with embedded documents
const movies = [
  {
    title: 'Top Gun',
    description: 'A modern action movie about elite naval aviators.',
    director: {
      name: 'Tony Scott',
      bio: 'Tony Scott was a British film director, producer, and screenwriter, known for his action films.',
      birthyear: '1944-06-21',
      deathyear: '2012-08-19'
    },
    genre: {
      name: 'Action',
      description: 'Fast-paced movies with intense sequences of physical action.'
    },
    imageURL: 'http://example.com/topgun.jpg',
    featured: true,
    releaseYear: 1986,
    runtime: 110
  },
  {
    title: 'The Little Mermaid',
    description: 'A Disney animated classic about a young mermaid\'s adventures.',
    director: {
      name: 'Ron Clements',
      bio: 'Ron Clements is an American animator, film director, and screenwriter known for his work on Disney classics.',
      birthyear: '1953-04-25',
      deathyear: null
    },
    genre: {
      name: 'Fantasy',
      description: 'Movies involving magical or supernatural elements.'
    },
    imageURL: 'http://example.com/littlemermaid.jpg',
    featured: false,
    releaseYear: 1989,
    runtime: 83
  },
  {
    title: 'Barbie (2024)',
    description: 'A live-action adaptation that explores Barbie\'s world and adventures.',
    director: {
      name: 'Greta Gerwig',
      bio: 'Greta Gerwig is an American filmmaker and actress known for her work on films like "Lady Bird" and "Little Women".',
      birthyear: '1983-08-04',
      deathyear: null
    },
    genre: {
      name: 'Fantasy',
      description: 'Movies involving magical or supernatural elements.'
    },
    imageURL: 'http://example.com/barbie2024.jpg',
    featured: true,
    releaseYear: 2024,
    runtime: 114
  },
  {
    title: 'Twisters',
    description: 'A thrilling movie about storm chasers facing nature\'s wrath.',
    director: {
      name: 'Jan de Bont',
      bio: 'Jan de Bont is a Dutch film director, producer, and cinematographer, known for his action movies.',
      birthyear: '1943-10-22',
      deathyear: null
    },
    genre: {
      name: 'Action',
      description: 'Fast-paced movies with intense sequences of physical action.'
    },
    imageURL: 'http://example.com/twisters.jpg',
    featured: true,
    releaseYear: 1996,
    runtime: 113
  },
  {
    title: 'The Notebook',
    description: 'A romantic drama about a love story that transcends time.',
    director: {
      name: 'Nick Cassavetes',
      bio: 'Nick Cassavetes is an American actor, director, and screenwriter known for his work on romantic dramas.',
      birthyear: '1959-05-21',
      deathyear: null
    },
    genre: {
      name: 'Romance',
      description: 'Movies centered around love and romantic relationships.'
    },
    imageURL: 'http://example.com/notebook.jpg',
    featured: true,
    releaseYear: 2004,
    runtime: 123
  },
  {
    title: 'Titanic',
    description: 'A historical romance set against the tragic sinking of the Titanic.',
    director: {
      name: 'James Cameron',
      bio: 'James Cameron is a Canadian filmmaker known for directing high-grossing films like Titanic and Avatar.',
      birthyear: '1954-08-16',
      deathyear: null
    },
    genre: {
      name: 'Romance',
      description: 'Movies centered around love and romantic relationships.'
    },
    imageURL: 'http://example.com/titanic.jpg',
    featured: true,
    releaseYear: 1997,
    runtime: 195
  },
  {
    title: 'Pretty Woman',
    description: 'A romantic comedy about a chance encounter that changes two lives.',
    director: {
      name: 'Garry Marshall',
      bio: 'Garry Marshall was an American film director, producer, and writer, known for romantic comedies.',
      birthyear: '1934-11-13',
      deathyear: '2016-07-19'
    },
    genre: {
      name: 'Romance',
      description: 'Movies centered around love and romantic relationships.'
    },
    imageURL: 'http://example.com/prettywoman.jpg',
    featured: false,
    releaseYear: 1990,
    runtime: 119
  },
  {
    title: 'How to Lose a Guy in 10 Days',
    description: 'A humorous tale about a woman writing an article on dating gone wrong.',
    director: {
      name: 'Donald Petrie',
      bio: 'Donald Petrie is an American film director known for directing romantic comedies.',
      birthyear: '1954-11-02',
      deathyear: null
    },
    genre: {
      name: 'Romance',
      description: 'Movies centered around love and romantic relationships.'
    },
    imageURL: 'http://example.com/lovehowto.jpg',
    featured: false,
    releaseYear: 2003,
    runtime: 116
  },
  {
    title: 'Aladdin',
    description: 'A young man discovers a magical lamp and embarks on an adventure to win the heart of Princess Jasmine.',
    director: {
      name: 'Ron Clements',
      bio: 'Ron Clements is an American animator, film director, and screenwriter known for his work on Disney classics.',
      birthyear: '1953-04-25',
      deathyear: null
    },
    genre: {
      name: 'Fantasy',
      description: 'Movies involving magical or supernatural elements.'
    },
    imageURL: 'http://example.com/aladdin.jpg',
    featured: true,
    releaseYear: 1992,
    runtime: 90
  },
  {
    title: 'The Wedding Planner',
    description: 'A romantic comedy about a wedding planner who finds herself falling for the groom.',
    director: {
      name: 'Adam Shankman',
      bio: 'Adam Shankman is an American film director, producer, and choreographer known for romantic comedies and musicals.',
      birthyear: '1964-11-27',
      deathyear: null
    },
    genre: {
      name: 'Romance',
      description: 'Movies centered around love and romantic relationships.'
    },
    imageURL: 'http://example.com/weddingplanner.jpg',
    featured: true,
    releaseYear: 2001,
    runtime: 103
  }
];

// Insert the movies into the database
Movie.insertMany(movies)
  .then(() => {
    console.log('Movies inserted successfully');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error inserting movies', err);
    mongoose.connection.close();
  });



  //

  const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/movie_api', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Movie and User models
const Movie = mongoose.model('Movie', new mongoose.Schema({}));
const User = mongoose.model('User', new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
  birthday: { type: Date, required: true }
}));

// Fetch ObjectIds and insert users
async function addUsersWithFavorites() {
  try {
    // Fetch movie IDs
    const movies = await Movie.find({ title: { $in: ['Top Gun', 'The Little Mermaid'] } }); // Adjust titles as needed
    const movieIds = movies.map(movie => movie._id);

    // Insert users with movie references
    const users = [
      {
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        password: 'password123',
        role: 'user',
        createdAt: new Date('2024-01-01'),
        favorites: movieIds.slice(0, 1), // Add the first movie
        birthday: new Date('1985-02-19')
      },
      {
        name: 'Bob Smith',
        email: 'bob.smith@example.com',
        password: 'password456',
        role: 'user',
        createdAt: new Date('2024-02-15'),
        favorites: movieIds.slice(1, 2), // Add the second movie
        birthday: new Date('1990-07-11')
      },
      {
        name: 'Catherine Lee',
        email: 'catherine.lee@example.com',
        password: 'password789',
        role: 'admin',
        createdAt: new Date('2024-03-10'),
        favorites: movieIds.slice(0, 2), // Add both movies
        birthday: new Date('1992-04-25')
      },
      {
        name: 'David Brown',
        email: 'david.brown@example.com',
        password: 'password101',
        role: 'user',
        createdAt: new Date('2024-04-20'),
        favorites: movieIds, // Add all movies
        birthday: new Date('1988-09-09')
      },
      {
        name: 'Ella White',
        email: 'ella.white@example.com',
        password: 'password202',
        role: 'user',
        createdAt: new Date('2024-05-30'),
        favorites: movieIds.slice(1), // Add all movies except the first
        birthday: new Date('1995-12-15')
      }
    ];

    await User.insertMany(users);
    console.log('Users with favorite movies inserted successfully');
  } catch (err) {
    console.error('Error inserting users with favorites:', err);
  } finally {
    mongoose.connection.close();
  }
}

// Run the function
addUsersWithFavorites();






  //


  const mongoose = require('mongoose');

// Connect to MongoDB (replace with your actual MongoDB URI)
mongoose.connect('mongodb://localhost:27017/movie_api', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Define the User Schema with a favorites field
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]  // Array of movie references
});

// Create a User model
const User = mongoose.model('User', userSchema);

// Insert sample users with references to movies (assuming movie IDs are known)
const users = [
  {
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    password: 'password123',
    role: 'user',
    createdAt: new Date('2024-01-01'),
    favorites: [
      // Add references to movie IDs from the 'movies' collection
      mongoose.Types.ObjectId('movie_id_1'),  // Replace with actual ObjectId
      mongoose.Types.ObjectId('movie_id_2')   // Replace with actual ObjectId
    ]
  },
  {
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    password: 'password456',
    role: 'user',
    createdAt: new Date('2024-02-15'),
    favorites: [
      mongoose.Types.ObjectId('movie_id_3'),  // Replace with actual ObjectId
      mongoose.Types.ObjectId('movie_id_4')
    ]
  }
];

// Insert the users into the database
User.insertMany(users)
  .then(() => {
    console.log('Users with favorite movies inserted successfully');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error inserting users', err);
    mongoose.connection.close();
  });
