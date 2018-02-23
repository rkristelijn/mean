const expect = require('chai').expect;
const app = require('../../');
const request = require('supertest')(app);

describe('Book integation testing with Supertest, Mocha and Chai...', (done) => {
  let server;

  before((done) => {
    server = app.listen(0, done);
  });
  after(() => {
    server.close();
  });
  it('get "/api/books" Should return an array', (done) => {
    request
      .get('/api/books')
      .expect(200)
      .expect((response) => {
        expect(response.body).to.be.an('Array');
      })
      .end(done);
  });
  it('post "/api/books" Should return a Book', (done) => {
    request
      .post('/api/books')
      .set('Content-Type', 'application/json')
      .send({
          message: 'Hello, Server!'
      })
      .expect((response) => {
        expect(response.body).to.deep.equal({});
      })
      .end(done);
  });
  it('post "/api/books" Should return an error "Title is required"', (done) => {
    request
      .post('/api/books')
      .set('Content-Type', 'application/json')
      .send({
        author: 'test',
        genre: 'test'
      })
      .expect(400)
      .expect('Title is required')
      .end(done);
  });
});
