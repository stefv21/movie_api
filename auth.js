const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const router = express.Router();


const users = [
  { id: 1, username: 'testuser', password: 'password123' }, // Example user
];


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

passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'your_jwt_secret',
      },
      (jwtPayload, done) => {
        const user = users.find((u) => u.id === jwtPayload.id);
        if (!user) {
          return done(null, false, { message: 'User not found' });
        }
        return done(null, user);
      }
    )
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

// Protected route (requires JWT token)
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: 'Welcome to your profile', user: req.user });
  });

module.exports = router;
