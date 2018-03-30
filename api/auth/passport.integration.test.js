/* eslint-disable max-nested-callbacks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const expect = require('chai').expect;
const app = require('../../app');
const request = require('supertest')(app);
const uuid = require('../shared/uuid')();

describe('Passport integration test', () => {
  let server;
  before(done => {
    server = app.listen(0, done);
  });
  after(() => {
    server.close();
  });
  it('Should not be logged in', done => {
    let user;
    request
      .get('/')
      .expect(200)
      .expect(response => {
        console.log(response);
        expect(req.user).to.be.undefined;
        done();
      });

    //expect('should').equal('not come here');
    //done();
  });
});
