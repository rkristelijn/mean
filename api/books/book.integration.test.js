const expect = require('chai').expect;
const app = require('../../app');
const request = require('supertest')(app);
const uuid = require('../shared/uuid')();

describe('Book integation testing with Supertest, Mocha and Chai...', () => {
  let server;
  let id;
  let book = {
    title: uuid.new(),
    author: uuid.new(),
    genre: uuid.new()
  };

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
  it('post "/api/books" Should create a book"', (done) => {
    request
      .post('/api/books')
      .set('Content-Type', 'application/json')
      .send(book)
      .expect(201)
      .expect(response => {
        expect(response.body).to.have.property('_id');
        expect(response.body.title).to.equal(book.title);
        expect(response.body.author).to.equal(book.author);
        expect(response.body.genre).to.equal(book.genre);
        expect(response.body.read).to.equal(false);

        id = response.body._id;
      })
      .end(done);
  });
  it('get "/api/books/:id" should return a book', (done) => {
    request
      .get(`/api/books/${id}`)
      .expect(200)
      .expect(response => {
        expect(response.body).to.have.property('_id');
        expect(response.body._id).to.equal(id);
      })
      .end(done);
  });
  it('get "/api/books/:id" should return a 400 on nonObjectId', (done) => {
    request
      .get('/api/books/allyourbase')
      .expect(400)
      .end(done);
  });
  it('get "/api/books/:id" should NOT return a book', (done) => {
    request
      .get('/api/books/000000000000000000000001')
      .expect(404)
      .end(done);
  });
  xit('put "/api/books/:id" should return an updated book', (done) => {
    request
      .put(`/api/books/${id}`)
      .set('Content-Type', 'application/json')
      .send({
        title: 'updatetest'
      })
      .expect(200)
      .expect(response => {
        expect(response.body).to.have.property('_id');
        expect(response.body._id).to.equal(id);
        expect(response.body.title).to.equal(book.title);
        expect(response.body.author).to.equal('updatetest');
        expect(response.body.genre).to.equal('updatetest');
        expect(response.body.read).to.equal(false);
      })
      .end(done);
  });
});
