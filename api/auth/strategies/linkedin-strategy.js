let passport = require('passport');
let LinkedinStrategy = require('passport-linkedin').Strategy;
let User = require('../../models/user-model');
let getId = require('./tools');

module.exports = () => {
  //get at https://www.npmjs.com/package/passport-linkedin
  // https://developer.linkedin.com/#
  passport.use(new LinkedinStrategy({
    consumerKey: '86k6pe79ixqstr',
    consumerSecret: 'SN9ktjovvW8EQW9V',
    callbackURL: 'http://rpi1.gius.nl:3000/auth/linkedin/callback',
    passReqToCallback: true
  }, (req, accessToken, refreshToken, profile, done) => {
    if (req.user) {
      let query = getId(req.user, 'linkedin');
      User.findOne(query, (error, user) => {
        if (user) {
          user.linkedin = {};
          user.linkedin.id = profile.id;
          user.linkedin.token = accessToken;
          user.save();
          done(null, user);
        }
      });
    } else {
      let query = { 'linkedin.id': profile.id };
      User.findOne(query, (error, user) => {
        if (user) {
          done(null, user);
        } else {
          /* eslint-disable no-param-reassign */
          user = new User();
          user.displayName = profile.displayName;
          user.linkedin = {};
          user.linkedin.id = profile.id;
          user.linkedin.token = accessToken;
          user.save();
          done(null, user);
        }
      });
    }
  }));
};
