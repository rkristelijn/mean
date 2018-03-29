let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

module.exports = () => {
  passport.use(new LocalStrategy(
    (username, password, done) => {
      if (username === password) {
        done(null, {
          username: 'scott',
          password: 'tiger',
          displayName: 'Bruce Scott',
          image: 'http://www.orafaq.com/wiki/images/c/c1/Bruce_Scott.jpg',
          email: 'b.scott@oracle.com',
          _id: '5abb58893bf0f15e2a48dda4',
          _v: '5abb58893bf0f15e2a48dda6'
        });
      } else {
        done('bad login', null);
      }
    }));
};
