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
});
