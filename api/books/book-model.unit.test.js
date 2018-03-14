let expect = require('chai').expect;
let Book = require('./book-model').Book;
let book;

let sampleBook = {
  title: 'The Best Way to Catch a Snake',
  author: 'Karma Yeshe Rabgye',
  genre: 'personal development'
};

describe('book-model', () => {
  beforeEach(done => {
    book = new Book(sampleBook);
    done();
  });
  describe('Object', () => {
    it('Should create', (done) => {
      expect(typeof book).to.equal('object');
      done();
    });
  });
  describe('Fields', () => {
    let fields = ['title', 'author', 'genre', 'read', '_id'];
    it(`Should have proper fields: ${fields}`, (done) => {
      /* eslint-disable no-unused-expressions */
      for (let field of fields) {
        expect(book.get(field)).not.to.be.undefined;
      }
      done();
    });
  });
  describe('Values', () => {
    it('Should have proper values', done => {
      let testBook = {
        title: 'The Best Way to Catch a Snake',
        author: 'Karma Yeshe Rabgye',
        genre: 'personal development',
        read: false,
        _id: 'NOT-EMPTY'
      };
      for (let field in testBook) {
        if (testBook[field] === 'NOT-EMPTY') {
          /* eslint-disable no-unused-expressions */
          expect(book.get(field)).not.to.be.undefined;
          continue;
        } else {
          expect(book.get(field)).to.equal(testBook[field]);
        }
      }
      done();
    });
  });
});
