let passport = require('passport');
let TwitterStrategy = require('passport-twitter').Strategy;
let User = require('../../models/user-model');
let getId = require('./tools');

module.exports = () => {
  //go to dev.twitter.com / manage your app
  passport.use(new TwitterStrategy({
    consumerKey: '7Z6Z83muXzvv6by8svDDpw3Qu',
    consumerSecret: 'wdWXUHmE1jAqKmr7Uhxtm8lrpsPqrbPAW8WotMCRiwxGgctFFs',
    callbackURL: 'http://rpi1.gius.nl:3000/auth/twitter/callback',
    passReqToCallback: true
  }, (req, accessToken, tokenSecret, profile, done) => {
    if (req.user) {
      let query = getId(req.user, 'twitter');
      User.findOne(query, (error, user) => {
        if (user) {
          user.twitter = {};
          user.twitter.id = profile.id;
          user.twitter.token = accessToken;
          user.save();
          done(null, user);
        }
      });
    } else {
      let query = { 'twitter.id': profile.id };
      User.findOne(query, (error, user) => {
        if (user) {
          done(null, user);
        } else {
          /* eslint-disable no-param-reassign */
          user = new User();
          user.image = profile._json.profile_image_url;
          user.displayName = profile.displayName;
          user.twitter = {};
          user.twitter.id = profile.id;
          user.twitter.token = accessToken;
          user.save();
          done(null, user);
        }
      });
    }
  }));
};
