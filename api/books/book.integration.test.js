/* eslint-disable max-nested-callbacks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const expect = require('chai').expect;
const app = require('../../app');
const request = require('supertest')(app);
const uuid = require('../shared/uuid')();

let id;

describe('Book integation testing with Supertest, Mocha and Chai...', () => {
  let server;
  let book = {
    title: uuid.new(),
    author: uuid.new(),
    genre: uuid.new()
  };

  before((done) => {
    server = app.listen(0, done);
    request
      .post('/api/books')
      .set('Content-Type', 'application/json')
      .send(book)
      .end((req, res) => {
        id = res.body._id;
      });
  });
  after(() => {
    server.close();
  });
  describe('Get', () => {
    it('get "/api/books" Should return an array', (done) => {
      request
        .get('/api/books')
        .expect(200)
        .expect((response) => {
          expect(response.body).to.be.an('Array');
        })
        .end(done);
    });
    it('get "/api/books/:id" should return a book', (done) => {
      request
        .get(`/api/books/${id}`)
        .end((err, res) => {
          expect(res.status).equal(200);
          expect(res.body).to.have.property('_id');
          expect(res.body._id).to.equal(id);
          done();
        });
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
  });
  describe('Post', () => {
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
        .end((err, res) => {
          expect(res.status).equal(201);
          expect(res.body).to.have.property('_id');
          expect(res.body.title).to.equal(book.title);
          expect(res.body.author).to.equal(book.author);
          expect(res.body.genre).to.equal(book.genre);
          expect(res.body.read).to.equal(false);

          id = res.body._id;

          done();
        });
    });
  });
  describe('Put', () => {
    it('put "/api/books/:id" should return an updated book.author', (done) => {
      request
        .put(`/api/books/${id}`)
        .set('Content-Type', 'application/json')
        .send({
          author: 'updatetest'
        })
        .expect(200)
        .expect(response => {
          expect(response.body).to.have.property('_id');
          expect(response.body._id).to.equal(id);
          expect(response.body.title).to.equal(book.title);
          expect(response.body.author).to.equal('updatetest');
          expect(response.body.read).to.equal(false);
        })
        .end(done);
    });
    it('put "/api/books/:id" should return an updated book.genre', (done) => {
      request
        .put(`/api/books/${id}`)
        .set('Content-Type', 'application/json')
        .send({
          genre: 'updatetest genre'
        })
        .expect(200)
        .expect(response => {
          expect(response.body).to.have.property('_id');
          expect(response.body._id).to.equal(id);
          expect(response.body.title).to.equal(book.title);
          expect(response.body.genre).to.equal('updatetest genre');
          expect(response.body.read).to.equal(false);
        })
        .end(done);
    });
  });
  describe('Patch', () => {
    it('patch "/api/books/:id" should return an updated book.author', (done) => {
      request
        .patch(`/api/books/${id}`)
        .set('Content-Type', 'application/json')
        .send({
          author: 'updatetest'
        })
        .expect(200)
        .expect(response => {
          expect(response.body).to.have.property('_id');
          expect(response.body._id).to.equal(id);
          expect(response.body.title).to.equal(book.title);
          expect(response.body.author).to.equal('updatetest');
          expect(response.body.read).to.equal(false);
        })
        .end(done);
    });
    it('patch "/api/books/:id" should return an updated book.genre', (done) => {
      request
        .patch(`/api/books/${id}`)
        .set('Content-Type', 'application/json')
        .send({
          genre: 'updatetest genre'
        })
        .expect(200)
        .expect(response => {
          expect(response.body).to.have.property('_id');
          expect(response.body._id).to.equal(id);
          expect(response.body.title).to.equal(book.title);
          expect(response.body.genre).to.equal('updatetest genre');
          expect(response.body.read).to.equal(false);
        })
        .end(done);
    });
  });
  describe('Delete', () => {
    it('delete "/api/books/:id" should delete a book', (done) => {
      request
        .delete(`/api/books/${id}`)
        .expect(204, done);

      done();
    });
    it('delete "/api/books/bla" should error out', (done) => {
      request
        .delete('/api/books/bla')
        .set('Content-Type', 'application/json')
        .send({
          genre: 'updatetest genre'
        })
        .expect(400)
        .expect('Cast to ObjectId failed for value: bla', done);
    });
    it('delete "/api/books/" should error out', (done) => {
      request
        .delete('/api/books/')
        .set('Content-Type', 'application/json')
        .send({
          genre: 'updatetest genre'
        })
        .expect(404)
        .expect('Not Found', done);
    });
  });
});
