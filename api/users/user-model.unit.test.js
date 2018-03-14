let expect = require('chai').expect;
let User = require('./user-model').User;
let user;

let sampleuser = {
  username: 'scott',
  password: 'tiger',
  displayName: 'Bruce Scott',
  image: 'http://www.orafaq.com/wiki/images/c/c1/Bruce_Scott.jpg',
  email: 'b.scott@oracle.com'
};

describe('user-model', () => {
  beforeEach(done => {
    user = new User(sampleuser);
    done();
  });
  describe('Object', () => {
    it('Should create', (done) => {
      expect(typeof user).to.equal('object');
      done();
    });
  });
  describe('Fields', () => {
    let fields = ['username', 'password', 'displayName', 'image', 'email', '_id'];
    it(`Should have proper fields: ${fields}`, (done) => {
      /* eslint-disable no-unused-expressions */
      for (let field of fields) {
        expect(user.get(field)).not.to.be.undefined;
      }
      done();
    });
  });
  describe('Values', () => {
    it('Should have proper values', done => {
      for (let field in sampleuser) {
        if (field === '_id') {
          /* eslint-disable no-unused-expressions */
          expect(user.get(field)).not.to.be.undefined;
          continue;
        } else {
          expect(user.get(field)).to.equal(sampleuser[field]);
        }
      }
      done();
    });
  });
  describe('Validations', () => {
    it('Should', (done) => {
      done();
    });
  });
});
