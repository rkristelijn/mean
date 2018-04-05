/* eslint-disable max-nested-callbacks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const expect = require('chai').expect;
const app = require('../../app');
const request = require('supertest')(app);
const uuid = require('../shared/uuid')();

let id;
let id2;

describe('User integation testing with Supertest, Mocha and Chai...', () => {
  let server;
  let user = {
    username: uuid.new(),
    password: uuid.new(),
    salt: uuid.new(),
    displayName: uuid.new(),
    image: uuid.new(),
    email: uuid.new()
  };

  let user2 = {
    username: uuid.new(),
    password: uuid.new(),
    salt: uuid.new(),
    displayName: uuid.new(),
    image: uuid.new(),
    email: uuid.new()
  };

  before((done) => {
    server = app.listen(0, done);
    request
      .post('/api/users')
      .set('Content-Type', 'application/json')
      .send(user)
      .end((req, res) => {
        id = res.body._id;
      });
  });
  after(() => {
    server.close();
  });

  describe('Get', () => {
    it('get "/api/users" Should return an array', (done) => {
      request
        .get('/api/users')
        .expect(200)
        .expect((response) => {
          expect(response.body).to.be.an('Array');
        })
        .end(done);
    });
    it('get "/api/users/:id" should return a user', (done) => {
      request
        .get(`/api/users/${id}`)
        .end((err, res) => {
          expect(res.status).equal(200);
          expect(res.body).to.have.property('_id');
          expect(res.body._id).to.equal(id);
          done();
        });
    });
    it('get "/api/users/:id" should return a 400 on nonObjectId', (done) => {
      request
        .get('/api/users/allyourbase')
        .expect(400)
        .end(done);
    });
    it('get "/api/users/:id" should NOT return a user', (done) => {
      request
        .get('/api/users/000000000000000000000001')
        .expect(404)
        .end(done);
    });
  });
  describe('Post', () => {
    it('post "/api/users" Should return an User', (done) => {
      request
        .post('/api/users')
        .set('Content-Type', 'application/json')
        .send({
          message: 'Hello, Server!'
        })
        .expect((response) => {
          expect(response.body).to.deep.equal({});
        })
        .end(done);
    });
    it('post "/api/users" Should return an error "displayName is required"', (done) => {
      request
        .post('/api/users')
        .set('Content-Type', 'application/json')
        .send({
          username: 'test',
          password: 'test'
        })
        .expect(400)
        .expect('User validation failed: displayName: Path `displayName` is required.')
        .end(done);
    });
    it('post "/api/users" Should create a user"', (done) => {
      request
        .post('/api/users')
        .set('Content-Type', 'application/json')
        .send(user2)
        .end((err, res) => {
          expect(res.status).equal(201);
          expect(res.body).to.have.property('_id');
          expect(res.body.username).to.equal(user2.username);
          expect(res.body.displayName).to.equal(user2.displayName);
          id2 = res.body._id;
          done();
        });
    });
    it('post "/api/users" Should throw unique error"', (done) => {
      request
        .post('/api/users')
        .set('Content-Type', 'application/json')
        .send(user2)
        .end((err, res) => {
          expect(res.status).equal(400);
          expect(res.text.substr(0, 32)).to.equal('E11000 duplicate key error index');
          done();
        });
    });
  });
  describe('Put', () => {
    it('put "/api/users/:id" should return an updated user.displayName', (done) => {
      request
        .put(`/api/users/${id}`)
        .set('Content-Type', 'application/json')
        .send({
          displayName: 'updatetest'
        })
        .expect(200)
        .expect(response => {
          expect(response.body).to.have.property('_id');
          expect(response.body._id).to.equal(id);
          expect(response.body.username).to.equal(user.username);
          expect(response.body.displayName).to.equal('updatetest');
        })
        .end(done);
    });
    it('put "/api/users/:id" should return an updated user.password', (done) => {
      request
        .put(`/api/users/${id}`)
        .set('Content-Type', 'application/json')
        .send({
          password: 'updatetest password'
        })
        .expect(200)
        .expect(response => {
          expect(response.body).to.have.property('_id');
          expect(response.body._id).to.equal(id);
          expect(response.body.username).to.equal(user.username);
          expect(response.body.password).to.equal('updatetest password');
        })
        .end(done);
    });
  });
  describe('Patch', () => {
    it('patch "/api/users/:id" should return an updated user.salt', (done) => {
      request
        .patch(`/api/users/${id}`)
        .set('Content-Type', 'application/json')
        .send({
          salt: 'updatetest'
        })
        .expect(200)
        .expect(response => {
          expect(response.body).to.have.property('_id');
          expect(response.body._id).to.equal(id);
          expect(response.body.username).to.equal(user.username);
          expect(response.body.salt).to.equal('updatetest');
        })
        .end(done);
    });
    it('patch "/api/users/:id" should return an updated user.image', (done) => {
      request
        .patch(`/api/users/${id}`)
        .set('Content-Type', 'application/json')
        .send({
          image: 'updatetest image'
        })
        .expect(200)
        .expect(response => {
          expect(response.body).to.have.property('_id');
          expect(response.body._id).to.equal(id);
          expect(response.body.image).to.equal('updatetest image');
        })
        .end(done);
    });
  });
  describe('Delete', () => {
    it('delete "/api/users/:id" should delete a user', (done) => {
      request
        .delete(`/api/users/${id}`)
        .expect(204, done);
      done();
    });
    it('delete "/api/users/bla" should error out', (done) => {
      request
        .delete('/api/users/bla')
        .set('Content-Type', 'application/json')
        .send({
          genre: 'updatetest genre'
        })
        .expect(400)
        .expect('Cast to ObjectId failed for value "bla" at path "_id" for model "User"', done);
    });
    it('delete "/api/users/" should error out', (done) => {
      request
        .delete('/api/users/')
        .set('Content-Type', 'application/json')
        .send({
          genre: 'updatetest genre'
        })
        .expect(404)
        .expect('Not Found', done);
    });
  });
});
