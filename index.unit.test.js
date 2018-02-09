const expect = require('chai').expect;

describe('Testing with Mocha and Chai...', () => {
  it('Should pass', (done) => {
    expect(true).to.equal(true);
    done();
  });
});
