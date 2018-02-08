const expect = require('chai').expect;
const Book = require('./book-model');
const sinon = require('sinon');

describe('books', () => {
  describe('book-model', () => {
    it('Should create', () => {
      let book = new Book();
      expect(book).to.be.an('object');
    });
    it('Should have book.read as boolean default to false', () => {
      let book = new Book();
      expect(book.read).to.be.a('boolean');
      expect(book.read).to.equal(false);
    });
    it('Should have title, author and genre with type string', () => {
      let book = new Book({
        title: 'test',
        author: 'test',
        genre: 'test'
      });
      expect(book.title).to.be.a('string');
      expect(book.author).to.be.a('string');
      expect(book.genre).to.be.a('string');
    });
  });

  describe('book-controller', () => {
    it('create: should not allow an empty title', () => {
      let MockBook = function () {
        this.save = function () { };
      };
      let req = {
        body: {
          author: 'Jon'
        }
      };
      let res = {
        status: sinon.spy(),
        send: sinon.spy()
      };

      let bookController = require('./book-controller')(MockBook);
      bookController.create(req, res);

      expect(res.status.calledWith(400)).to.be.equal(
        true, 'Bad Status ' + res.status.args[0][0]
      );
      expect(res.send.calledWith('Title is required')).to.be.equal(true);
    });
    it('readAll: should allow genre as query param', () => {
      let MockBook = {
        find: sinon.spy()
      };
      let res = {
        send: sinon.spy(),
        status: 200,
        body: '',
        json: function (passedBook) {
          this.body = passedBook;
        }
      };
      let bookController = require('./book-controller')(MockBook);
      let req = {
        query: {
          genre: 'Historical Fiction'
        }
      };
      bookController.readAll(req, res);
      expect(MockBook.find.args[0][0]).to.deep.equal(req.query);
    });
    it('readAll: should not allow title as query param', () => {
      /* eslint-disable no-shadow */
      let MockBook = {
        find: sinon.spy()
      };
      let res = {
        send: sinon.spy(),
        status: 200,
        body: '',
        json: function (passedBook) {
          this.body = passedBook;
        }
      };
      let bookController = require('./book-controller')(MockBook);
      let req = {
        query: {
          title: 'Historical Fiction'
        }
      };
      bookController.readAll(req, res);
      expect(MockBook.find.args[0][0]).to.deep.equal({});
    });
    it('readOne: should pass the id of the book', () => {
      /* eslint-disable no-shadow */
      let book = new Book({
        _v: 'myid',
        title: 'test',
        author: 'test',
        genre: 'test'
      });
      let MockBook = {
        findById: sinon.spy()
      };
      let res = {
        send: sinon.spy(),
        status: 200,
        body: book,
        json: function (passedBook) {
          this.body = passedBook;
        }
      };
      let bookController = require('./book-controller')(MockBook);
      let req = {
        params: {
          bookId: 'myid'
        }
      };
      bookController.readOne(req, res);
      expect(MockBook.findById.args[0][0]).to.equal('myid');
    });
    it('readOne: should not allow empty bookId', () => {
      /* eslint-disable no-shadow */
      let MockBook = {
        findById: sinon.spy()
      };
      let res = {
        send: sinon.spy(),
        status: sinon.spy()
      };
      let bookController = require('./book-controller')(MockBook);
      let req = {
        params: {
        }
      };
      bookController.readOne(req, res);
      expect(res.status.calledWith(400)).to.be.equal(
        true, 'bookId is required ' + res.status.args[0][0]
      );
    });
    it('update: should not allow empty bookId', () => {
      /* eslint-disable no-shadow */
      let book = {
        _v: 'myId',
        title: 'Opvoeden in een gestoorde wereld',
        author: 'Eugenie van Ruitenbeek, Jan Nouwen',
        genre: 'Parenting'
      };
      let MockBook = {
        findById: sinon.spy(),
        save: sinon.spy()
      };
      let res = {
        send: sinon.spy(),
        status: sinon.spy()
      };
      let bookController = require('./book-controller')(MockBook);
      let req = {
        book: {
          title: null,
          author: null,
          genre: null,
          save: sinon.spy()
        },
        params: {},
        body: {
          title: book.title,
          author: book.author,
          genre: book.genre
        }
      };
      bookController.updateOne(req, res);
      expect(res.status.calledWith(400)).to.be.equal(
        true, 'bookId is required ' + res.status.args[0][0]
      );
    });
    it('update: should update all values of the book', () => {
      /* eslint-disable no-shadow */
      let book = {
        _v: 'myId',
        title: 'Opvoeden in een gestoorde wereld',
        author: 'Eugenie van Ruitenbeek, Jan Nouwen',
        genre: 'Parenting',
        read: true
      };

      let MockBook = {
        findById: sinon.spy()
      };
      let res = {
        send: sinon.spy(),
        status: sinon.spy(),
        json: sinon.spy()
      };
      let bookController = require('./book-controller')(MockBook);
      let req = {
        book: {
          title: 'old title value',
          author: 'old author value',
          genre: 'old genre value',
          read: false,
          save: sinon.spy()
        },
        params: {
          bookId: book._v
        },
        body: {
          title: book.title,
          author: book.author,
          genre: book.genre,
          read: book.read
        }
      };
      bookController.updateOne(req, res);
      expect(MockBook.findById.args[0][0]).to.equal(book._v);
      expect(req.book.save.calledOnce);
      expect(req.book.title).to.be.equal(book.title);
      expect(req.book.author).to.be.equal(book.author);
      expect(req.book.genre).to.be.equal(book.genre);
      expect(req.book.read).to.be.equal(book.read);
    });
    it('update: should only update title', () => {
      /* eslint-disable no-shadow */
      let book = {
        _v: 'myId',
        title: 'Opvoeden in een gestoorde wereld',
        author: 'Eugenie van Ruitenbeek, Jan Nouwen',
        genre: 'Parenting',
        read: true
      };

      let MockBook = {
        findById: sinon.spy()
      };
      let res = {
        send: sinon.spy(),
        status: sinon.spy(),
        json: sinon.spy()
      };
      let bookController = require('./book-controller')(MockBook);
      let req = {
        book: {
          title: 'old title value',
          author: 'old author value',
          genre: 'old genre value',
          read: false,
          save: sinon.spy()
        },
        params: {
          bookId: book._v
        },
        body: {
          title: book.title
        }
      };
      bookController.updateOne(req, res);
      expect(MockBook.findById.args[0][0]).to.equal(book._v);
      expect(req.book.save.calledOnce);
      expect(req.book.title).to.be.equal(book.title);
      expect(req.book.author).to.be.equal(req.book.author);
      expect(req.book.genre).to.be.equal(req.book.genre);
      expect(req.book.read).to.be.equal(req.book.read);
    });
  });
});
