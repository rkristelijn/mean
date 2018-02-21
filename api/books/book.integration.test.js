const expect = require('chai').expect;
const app = require('../../');
const request = require('supertest')(app);

describe('Book integation testing with Supertest, Mocha and Chai...', () => {
  it('get "/api/books" Should return an array', (done) => {
    request
      .get('/api/books')
      .expect(200)
      .expect((response) => {
        expect(response.body).to.be.an('Array');
      })
      .end(done);
  });
});
