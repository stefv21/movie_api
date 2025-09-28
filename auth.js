const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
      require ('./passport');
      
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const router = express.Router();





const SECRET_KEY = process.env.JWT_SECRET || 'your_jwt_secret';







/**
 * Generate a JWT token for a user
 * @param {Object} user - The user object
 * @param {string} expiresIn - Token expiration time (default is '1h')
 * @returns {string} - Signed JWT token
 */
const generateJWTToken = (user, expiresIn = '1h') => {
  const payload = {
    id: user._id,
    username: user.username,
};
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};


/**
 * Express route handler for user login.
 * @name loginUser
 * @function
 * @memberof module:Auth
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
module.exports = (router) => {
  router.post('/login', (req, res) => {
    // Basic CSRF protection - check origin
    const origin = req.get('Origin') || req.get('Referer');
    const allowedOrigins = ['http://localhost:3000', 'https://myflixapp-0225.netlify.app', 'https://stefv21.github.io'];
    
    if (origin && !allowedOrigins.some(allowed => origin.startsWith(allowed))) {
      return res.status(403).json({ message: 'Forbidden origin' });
    }
    
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user,
        });
      }
      let token = generateJWTToken(user.toJSON());
      return res.json({ user, token });
    })(req, res);
  });
};


