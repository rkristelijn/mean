let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

module.exports = () => {
  console.log('loading LocalStrategy');
  passport.use(new LocalStrategy(
    (username, password, done) => {
      console.log('using LocalStrategy', username, password);
      if (username === password) {
        console.log('good login');
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
        console.log('bad login');
        done('bad login', null);
      }
    }));
};
