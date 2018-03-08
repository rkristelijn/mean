/* eslint-disable max-nested-callbacks */
/* eslint-disable no-unused-vars */
const expect = require('chai').expect;
const bookModel = require('./book-model').bookModel;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Mockgoose = require('mockgoose').Mockgoose;
//todo: Mockgoose doesn't run on the pi: unsupported architecture,
// ia32 and x64 are the only valid options
const mockgoose = new Mockgoose(mongoose);

bookModel.pre('remove', function (next) {
  if (this.title == 'Turbo Man') {
    let err = new Error('Need to get a Turbo Man for Christmas');
    next(err);
  }
  next();
});

const bookAdapter = require('./book-adapter')(mongoose.model('TestBook', bookModel));

before((done) => {
  mockgoose.prepareStorage().then(() => {
    mongoose.connect('mongodb://localhost/bookAPI',
      (err) => {
        done(err);
      });
  });
});

after((done) => {
  mongoose.connection.close(() => {
    done();
  });
});

describe('book-adapter', () => {
  let id;
  let id2;
  describe('Create', () => {
    it('Create with no data should throw error', (done) => {
      bookAdapter.create({}, (err) => {
        expect(err).to.be.equal('Title is required');
        done();
      });
    });
    it('Should create', (done) => {
      bookAdapter.create({
        title: 'hooi'
      }, (err) => {
        expect(err).to.be('undefined');
        done();
      }, book => {
        expect(book.title).to.equal('hooi');
        expect(book.read).to.equal(false);
        id = book._id.toString();
        done();
      });
    });
  });
  describe('Read', () => {
    it('Read without bookId should throw error', done => {
      bookAdapter.read(id, (err) => {
        expect(err).to.be.equal('bookId is required');
        done();
      }, book => {
        expect(book).to.be('undefined');
        done();
      });
    });
    it('Read should return a book that was just created', done => {
      bookAdapter.read({ id: id }, (err) => {
        expect(err).to.be('undefined');
        done();
      }, book => {
        expect(book.title).to.equal('hooi');
        expect(book.read).to.equal(false);
        done();
      });
    });
  });
  describe('Update', () => {
    it('Update should add a genre', done => {
      bookAdapter.update({
        id: id,
        genre: 'Some genre'
      }, (err) => {
        expect(err).to.be('undefined');
        done();
      }, book => {
        expect(book.title).to.equal('hooi');
        expect(book.genre).to.equal('Some genre');
        expect(book.read).to.equal(false);
        done();
      });
    });
    it('Update should add a author', done => {
      bookAdapter.update({
        id: id,
        author: 'Some author'
      }, (err) => {
        expect(err).to.be('undefined');
        done();
      }, book => {
        expect(book.title).to.equal('hooi');
        expect(book.genre).to.equal('Some genre');
        expect(book.author).to.equal('Some author');
        expect(book.read).to.equal(false);
        done();
      });
    });
  });
  describe('Query', () => {
    it('Should create another one', (done) => {
      bookAdapter.create({
        title: 'haai'
      }, (err) => {
        expect(err).to.be('undefined');
        done();
      }, book => {
        expect(book.title).to.equal('haai');
        expect(book.read).to.equal(false);
        id2 = book._id.toString();
        done();
      });
    });
    it('Should return two items', (done) => {
      bookAdapter.query({}, err => {
        expect(err).to.be('undefined');
        done();
      }, books => {
        expect(books.length).to.equal(2);
        done();
      });
    });
  });
  describe('Delete', () => {
    it('Should delete one item', (done) => {
      bookAdapter.delete({ id: id }, err => {
        expect(err).to.be('undefined');
        done();
      }, book => {
        bookAdapter.read({ id: book.id }, (err) => {
          expect(err).to.equal('Book not found: ' + book.id);
        }, bookDeleted => {
          expect(bookDeleted).to.equal(null);
        });
        bookAdapter.query({}, err => {
          expect(err).to.be('undefined');
          done();
        }, books => {
          expect(books.length).to.equal(1);
          done();
        });
      });
    });
    it('Should delete all items', (done) => {
      bookAdapter.delete({ id: id2 }, err => {
        expect(err).to.be('undefined');
        done();
      }, book => {
        bookAdapter.read({ id: book.id }, (err) => {
          expect(err).to.equal('Book not found: ' + book.id);
        }, bookDeleted => {
          expect(bookDeleted).to.equal(null);
        });
        bookAdapter.query({}, err => {
          expect(err).to.be('undefined');
          done();
        }, books => {
          expect(books.length).to.equal(0);
          done();
        });
      });
    });
    it('Should raise Turbo Man error on delete', (done) => {
      bookAdapter.create({
        title: 'Turbo Man'
      }, (err) => {
      }, book => {
        bookAdapter.delete({ id: book.id }, err => {
          expect(err).to.equal('Cannot remove book: Error: Need to get a Turbo Man for Christmas')
          done();
        }, (book) => {
          expect(book).to.be('undefined');
          done();
        });
      });
    });
    it('Should raise not-found-error on delete', (done) => {
      bookAdapter.delete({ id: '000000000000000000000001' }, err => {
        expect(err).to.equal('Cannot find book: 000000000000000000000001')
        done();
      }, (book) => {
        expect(book).to.be('undefined');
        done();
      });
    });
    it('Should raise non-Id on delete', (done) => {
      bookAdapter.delete({ id: 'dus' }, err => {
        expect(err).to.equal('Cast to ObjectId failed for value: dus')
        done();
      }, (book) => {
        expect(book).to.be('undefined');
        done();
      });
    });
  });
});
