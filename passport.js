const passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      Models = require('./models.js'),
      passportJWT = require('passport-jwt');

    let Users = Models.User,
      JWTStrategy = passportJWT.Strategy,
      ExtractJWT = passportJWT.ExtractJwt;

const SECRET_KEY = process.env.JWT_SECRET || 'your_jwt_secret';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'Username',
      passwordField: 'Password',
    },
    async (username, password, callback) => {
      try {
        const user = await Users.findOne({ username: username });
        if (!user) {
          console.log('incorrect username');
          return callback(null, false, {
            message: 'Incorrect username or password.',
          });
        }
        if (!user.validatePassword(password)) {
          console.log('incorrect password');
          return callback(null, false, { message: 'Incorrect password.' });
        }
        console.log('finished');
        return callback(null, user);
      } catch (error) {
        console.error('Error during authentication:', error);
        return callback(error);
      }
    }
  )
);



passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: SECRET_KEY,
    },
    async (jwtPayload, callback) => {
      try {
        const user = await Users.findById(jwtPayload.id);
        if (!user) {
          return callback(null, false, { message: 'User not found.' });
        }
        return callback(null, user);
      } catch (error) {
        console.error('Error in JWT verification:', error);
        return callback(error, false);
      }
    }
  )
);


