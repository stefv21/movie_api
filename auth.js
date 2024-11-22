const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const router = express.Router();


const users = [
  { id: 1, username: 'testuser', password: 'password123' }, 
];


const SECRET_KEY = process.env.JWT_SECRET || 'your_jwt_secret';

/**
 * Generate a JWT token for a user
 * @param {Object} user - The user object
 * @param {string} expiresIn - Token expiration time (default is '1h')
 * @returns {string} - Signed JWT token
 */
const generateJWTToken = (user, expiresIn = '1h') => {
  const payload = {
    id: user.id,
    username: user.username,
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};



// Initialize Passport middleware
router.use(passport.initialize());

// Login endpoint
router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ message: info.message || 'Login failed' });
    }
    // Generate JWT token
    const token = generateJWTToken(user);
    return res.json({ message: 'Login successful', token });
  })(req, res, next);
});

// Protected route (requires JWT token)
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: 'Welcome to your profile', user: req.user });
  });

module.exports = router;
