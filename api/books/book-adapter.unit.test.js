/* eslint-disable max-nested-callbacks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const expect = require('chai').expect;
const bookModel = require('./book-model').bookModel;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Mockgoose = require('mockgoose').Mockgoose;
//todo: Mockgoose doesn't run on the pi: unsupported architecture,
// ia32 and x64 are the only valid options
// @see https://github.com/mccormicka/Mockgoose/issues/231
const mockgoose = new Mockgoose(mongoose);

let id = '';
let id2 = '';
let idErr = '';
let skipOnce = false;

bookModel.pre('remove', function (next) {
  if (this._id.equals(idErr)) {
    let err = new Error('Need to get a Turbo Man for Christmas');
    idErr = '';
    next(err);
  }
  if (this.title === 'Turbo Man') {
    let err = new Error('Need to get a Turbo Man for Christmas');
    next(err);
  }
  next();
});
bookModel.pre('save', function (next) {
  if (this.title === 'Turbo Man') {
    let err = new Error('Need to get a Turbo Man for Christmas');
    next(err);
  }
  next();
});
bookModel.pre('find', function (next) {
  if (this._conditions.title === 'Turbo Man') {
    let err = new Error('Need to get a Turbo Man for Christmas');
    next(err);
  }
  next();
});
bookModel.pre('findOne', function (next) {
  if (this._conditions._id.equals(idErr)) {
    if(!skipOnce) {
      let err = new Error('Need to get a Turbo Man for Christmas');
      idErr = '';
      next(err);
    } else {
      skipOnce = false;
      next();
    }
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
    it('Should raise non-Id on delete when Id is \'For great justice.\'', (done) => {
      bookAdapter.read({ id: 'For great justice.' }, err => {
        expect(err).to.equal('Cast to ObjectId failed for value: For great justice.');
        done();
      }, (book) => {
        expect(book).to.be('undefined');
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
    it('Should raise Turbo Man error on update', (done) => {
      bookAdapter.update({
        id: id,
        title: 'Turbo Man',
        author: 'Some other author'
      }, (err) => {
        expect(err).to.equal('Cannot save book: Error: Need to get a Turbo Man for Christmas');
        done();
      }, book => {
        expect(book.title).to.equal('this is not right');
        done();
      });
    });
    it('Should raise not-found-error on update', (done) => {
      idErr = mongoose.Types.ObjectId(id);
      bookAdapter.update({
        id: id,
        title: 'What\'s a body gotta do, to get a drink of soda pop around here?',
        author: 'Some other author'
      }, (err) => {
        expect(err).to.equal('Cannot find book: Error: Need to get a Turbo Man for Christmas');
        idErr = '';
        done();
      }, book => {
        expect(book.title).to.equal('this is not right');
        idErr = '';
        done();
      });
    });
    it('Should raise non-Id error on update when Id is \'Take off every ZIG!\'', (done) => {
      bookAdapter.update({
        id: 'Take off every ZIG!',
        title: 'Zero Wing',
        author: 'Cats'
      }, (err) => {
        expect(err).to.equal('Cast to ObjectId failed for value: Take off every ZIG!');
        done();
      }, book => {
        expect(book.title).to.equal('this is not right');
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
    it('Should raise Turbo Man error on query', (done) => {
      bookAdapter.query({title: 'Turbo Man'}, err => {
        expect(err).to.equal('Cannot find book: Error: Need to get a Turbo Man for Christmas');
        done();
      }, books => {
        expect(books).to.equal('Should throw error');
        done();
      });
    });
  });
  describe('Delete', () => {
    it('Should raise cannot remove on delete', (done) => {
      idErr = id;
      skipOnce = true;
      bookAdapter.delete({ id: id }, err => {
        expect(err).to.equal('Cannot remove book: Error: Need to get a Turbo Man for Christmas');
        done();
      }, (book) => {
        expect(book).to.be('undefined');
        done();
      });
    });
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
        done();
      }, book => {
        bookAdapter.delete({ id: book.id }, err => {
          expect(err).to.equal('Cannot remove book: Error: Need to get a Turbo Man for Christmas');
          done();
        }, (book) => {
          expect(book).to.be('undefined');
          done();
        });
      });
    });
    it('Should raise not-found-error on delete', (done) => {
      bookAdapter.delete({ id: '000000000000000000000001' }, err => {
        expect(err).to.equal('Cannot find book: 000000000000000000000001');
        done();
      }, (book) => {
        expect(book).to.be('undefined');
        done();
      });
    });
    it('Should raise non-Id on delete when Id is \'All your base are belong to us!\'', (done) => {
      bookAdapter.delete({ id: 'All your base are belong to us!' }, err => {
        expect(err).to.equal('Cast to ObjectId failed for value: All your base are belong to us!');
        done();
      }, (book) => {
        expect(book).to.be('undefined');
        done();
      });
    });
  });
});
