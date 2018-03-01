//const expect = require('chai').expect;
let app = require('../app');
let request = require('supertest')(app);

describe('Basic api integation testing with Supertest, Mocha and Chai...', () => {
  it('get "/" Should say "Hello world\\n"', (done) => {
    request
      .get('/')
      .expect(200)
      .expect('Hello world\n')
      .end(done);
  });
  // xit('get "/api" Should return HATEOS url"', (done) => {
  //   request
  //     .get('/api')
  //     .expect(200)
  //     .expect((response) => {
  //       //{"books":{"links":"http://127.0.0.1:3100/api/books"}})
  //       expect(response.body).to.have.property('books');
  //       expect(response.body.books).to.have.property('links');
  //     })
  //     .end(done);
  // });
});
