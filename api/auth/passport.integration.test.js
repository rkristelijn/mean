/* eslint-disable max-nested-callbacks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const expect = require('chai').expect;
const app = require('../../app');
const request = require('supertest')(app);
//const superagent = require('superagent');
// @see https://jaketrent.com/post/authenticated-supertest-tests/
//const agent = superagent.agent();

describe('Passport integration test', () => {
  let server;
  before(done => {
    server = app.listen(0, done);
  });
  after(() => {
    server.close();
  });
  it('Should not be logged in', (done) => {
    request
      .get('/')
      .expect(200)
      .expect(response => {
        /* eslint-disable no-unused-expressions */
        expect(response.user).to.be.undefined;
      })
      .end(done);
  });
  it('Should log in', done => {
    request
      .post('/api/auth/local/login')
      .set('Content-Type', 'application/json')
      .send({
        username: 'myusername',
        password: 'myusername'
      })
      .expect(302)
      .end(done);
  });
  it('Should log out', done => {
    request
      .get('/api/auth/local/logout')
      .expect(302)
      .end(done);
  });
});
