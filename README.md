# myFlix Movie API

A RESTful API for a movie database application built with Node.js, Express, and MongoDB. This API provides endpoints for managing movies, users, and user authentication.

## Overview

**Objective:**  
Build a server-side API that provides movie information and user management functionality for the myFlix application.

**Context:**  
This API serves as the backend for a movie application, handling data storage, user authentication, and providing movie information to client applications.

## Features

- **Movie Management:** CRUD operations for movies with detailed information
- **User Management:** User registration, authentication, and profile management
- **JWT Authentication:** Secure authentication using JSON Web Tokens
- **Data Validation:** Input validation using express-validator
- **Password Security:** Bcrypt password hashing
- **CORS Support:** Cross-origin resource sharing for client applications

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** Passport.js with JWT strategy
- **Validation:** express-validator
- **Security:** bcryptjs for password hashing
- **Documentation:** JSDoc

## API Endpoints

### Authentication
- `POST /users` - Register a new user
- `POST /login` - User login (returns JWT token)

### Movies
- `GET /movies` - Get all movies (requires authentication)
- `GET /movies/:id` - Get movie by ID
- `POST /movies` - Create a new movie
- `PUT /movies/:id` - Update movie by ID
- `DELETE /movies/:id` - Delete movie by ID

### Users
- `GET /users` - Get all users
- `GET /users/:Username` - Get user by username
- `PUT /users/:Username` - Update user by username
- `DELETE /users/:Username` - Delete user by username

### Utility
- `GET /` - Welcome message
- `GET /test` - Test endpoint

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/movie-api.git
   cd movie-api
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   CONNECTION_URI=mongodb://localhost:27017/myFlixDB
   JWT_SECRET=your_jwt_secret_key
   PORT=8000
   ```

4. **Start the Server:**
   ```bash
   npm start
   ```
   
   For development with auto-restart:
   ```bash
   npm run dev
   ```

## Usage

### Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Example Requests

**Register a User:**
```bash
curl -X POST http://localhost:8000/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123",
    "birthday": "1990-01-01"
  }'
```

**Get All Movies:**
```bash
curl -X GET http://localhost:8000/movies \
  -H "Authorization: Bearer <your_jwt_token>"
```

## Data Models

### Movie Schema
```javascript
{
  Title: String,
  Description: String,
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String,
    Birth: String,
    Death: String
  },
  ImagePath: String,
  Featured: Boolean,
  ReleaseYear: Number,
  Runtime: Number
}
```

### User Schema
```javascript
{
  username: String,
  password: String (hashed),
  email: String,
  birthday: Date,
  favoriteMovies: [ObjectId]
}
```

## Documentation

API documentation is generated using JSDoc and can be found in the `out/` directory after running:
```bash
npx jsdoc index.js
```

Open `out/index.html` in your browser to view the complete API documentation.

## Deployment

The API is configured for deployment on Heroku with the following allowed origins:
- `http://localhost:3000` (development)
- `https://myflixapp-0225.netlify.app` (production client)
- `https://stefv21.github.io/myFlix-Angular-client/` (Angular client)

## Dependencies

### Production Dependencies
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **passport** - Authentication middleware
- **passport-jwt** - JWT authentication strategy
- **passport-local** - Local authentication strategy
- **jsonwebtoken** - JWT token generation
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **cors** - Cross-origin resource sharing
- **morgan** - HTTP request logger
- **dotenv** - Environment variable management
- **body-parser** - Parse incoming request bodies
- **lodash** - Utility library
- **uuid** - Generate unique identifiers
- **react** - React library (for client integration)
- **react-dom** - React DOM library

### Development Dependencies
- **jsdoc** - API documentation generation
- **eslint** - Code linting
- **nodemon** - Development server with auto-restart
- **process** - Process utilities

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.