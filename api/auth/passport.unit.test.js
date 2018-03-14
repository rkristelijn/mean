/* eslint-disable max-nested-callbacks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const expect = require('chai').expect;
const passport = require('./passport');

describe('passport', () => {
  describe('serializeUser', () => {
    it('Should test nothing', (done) => {
      let sampleUser = {
        username: 'hello',
        password: 'hello'
      };
      // passport.authenticate(sampleUser, (err, user) => {
      //   console.log(user);
      //   expect(user).to.deep.equal(sampleUser);
      //   done();
      // });
      expect(passport).not.equal(false);
      done();
    });
  });
  describe('deserializeUser', () => { });
});
