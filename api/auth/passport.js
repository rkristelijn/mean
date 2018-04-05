let passport = require('passport');
// todo: read http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt
module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  // require('./strategies/mock-strategy')();
  // require('./strategies/google-strategy')()
  // require('./strategies/twitter-strategy')()
  // require('./strategies/facebook-strategy')()
  // require('./strategies/github-strategy')()
  // require('./strategies/linkedin-strategy')()
  require('./strategies/local-strategy')();
};
