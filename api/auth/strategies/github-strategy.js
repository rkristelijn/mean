let passport = require('passport');
let GithubStrategy = require('passport-github').Strategy;
let User = require('../../models/user-model');
let getId = require('./tools');

module.exports = () => {
  //get at https://github.com/settings/applications/659234
  passport.use(new GithubStrategy({
    clientID: '2e607897e6ad15e52d5d',
    clientSecret: '2475c03d69b707f6c8248ab1da15d9d3e1c58090',
    callbackURL: 'http://rpi1.gius.nl:3000/auth/github/callback',
    passReqToCallback: true
  }, (req, accessToken, refreshToken, profile, done) => {
    if (req.user) {
      let query = getId(req.user, 'github');
      User.findOne(query, (error, user) => {
        if (user) {
          user.github = {};
          user.github.id = profile.id;
          user.github.token = accessToken;
          user.save();
          done(null, user);
        }
      });
    } else {
      let query = { 'github.id': profile.id };
      User.findOne(query, (error, user) => {
        if (user) {
          done(null, user);
        } else {
          /* eslint-disable no-param-reassign */
          user = new User();
          user.image = profile.photos[0].value;
          user.displayName = profile.displayName;
          user.github = {};
          user.github.id = profile.id;
          user.github.token = accessToken;
          user.save();
          done(null, user);
        }
      });
    }
  }));
};
