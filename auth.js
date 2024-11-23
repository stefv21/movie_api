const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
      require ('./passport');
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
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user,
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
};


