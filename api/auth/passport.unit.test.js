/* eslint-disable max-nested-callbacks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const expect = require('chai').expect;
const passport = require('passport');

let sampleUser = {
  username: 'hello',
  password: 'hello'
};

describe('passport', () => {
  describe('serializeUser', () => {
    xit('Should login', (done) => {
      passport.authenticate('local', (err, user) => {
        // does nothing here
        console.log(user);
        expect(user).to.deep.equal(sampleUser);
        done();
      });
      //what to check here?
      done();
    });
  });
  describe('deserializeUser', () => {
    xit('Should logout', (done) => {
      // passport.deserializeUser(null, (err, user) => {
      //   console.log(user);
      //   console.log(err);
      // });
      done();
    });
  });
});
