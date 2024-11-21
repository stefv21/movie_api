const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

const router = express.Router();

// Mock user data (replace with database lookup)
const users = [
  { id: 1, username: 'testuser', password: 'password123' }, // Example user
];

// Passport Local Strategy
passport.use(
  new LocalStrategy((username, password, done) => {
    const user = users.find((u) => u.username === username);
    if (!user) {
      return done(null, false, { message: 'Invalid username' });
    }
    if (user.password !== password) {
      return done(null, false, { message: 'Invalid password' });
    }
    return done(null, user);
  })
);

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
    const token = jwt.sign({ id: user.id, username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });
    return res.json({ message: 'Login successful', token });
  })(req, res, next);
});

module.exports = router;
