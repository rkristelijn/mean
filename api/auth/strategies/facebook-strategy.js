let passport = require('passport');
let FacebookStrategy = require('passport-facebook').Strategy;
let User = require('../../models/user-model');
let getId = require('./tools');

module.exports = () => {
  //get at developers.facebook.com
  passport.use(new FacebookStrategy({
    clientID: '143079706368075',
    clientSecret: 'c66a3db0c4a0be2c48af5e2553a76019',
    callbackURL: 'http://rpi1.gius.nl:3000/auth/facebook/callback',
    passReqToCallback: true
  }, (req, accessToken, refreshToken, profile, done) => {
    if (req.user) {
      let query = getId(req.user, 'facebook');
      User.findOne(query, (error, user) => {
        if (user) {
          user.facebook = {};
          user.facebook.id = profile.id;
          user.facebook.token = accessToken;
          user.save();
          done(null, user);
        }
      });
    } else {
      let query = { 'facebook.id': profile.id };
      User.findOne(query, (error, user) => {
        if (user) {
          done(null, user);
        } else {
          /* eslint-disable no-param-reassign */
          user = new User();
          user.displayName = profile.displayName;
          user.facebook = {};
          user.facebook.id = profile.id;
          user.facebook.token = accessToken;
          user.save();
          done(null, user);
        }
      });
    }
  }));
};
