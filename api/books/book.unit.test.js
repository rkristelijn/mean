const expect = require('chai').expect;
const Book = require('./book-model');
const sinon = require('sinon');
const mockExpress = require('mock-express');
//const request = require('supertest'); //supertest is only for integration tests

describe('books', () => {
  describe('book-model', () => {
    it('Should create', (done) => {
      let book = new Book();
      expect(book).to.be.an('object');
      done();
    });
    it('Should have book.read as boolean default to false', (done) => {
      let book = new Book();
      expect(book.read).to.be.a('boolean');
      expect(book.read).to.equal(false);
      done();
    });
    it('Should have title, author and genre with type string', (done) => {
      let book = new Book({
        title: 'test',
        author: 'test',
        genre: 'test'
      });
      expect(book.title).to.be.a('string');
      expect(book.author).to.be.a('string');
      expect(book.genre).to.be.a('string');
      done();
    });
  });

  describe('book-controller', () => {
    it('create: should not allow an empty title', (done) => {
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
      done();
    });
    it('readAll: should allow genre as query param', (done) => {
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
      done();
    });
    it('readAll: should not allow title as query param', (done) => {
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
      done();
    });
    it('readOne: should pass the id of the book', (done) => {
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
      done();
    });
    it('readOne: should not allow empty bookId', (done) => {
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
      done();
    });
    it('updateOne: should not allow empty bookId', (done) => {
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
      done();
    });
    it('updateOne: should update all values of the book', (done) => {
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
      done();
    });
    it('updateOne: should only update title', (done) => {
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
      expect(req.book.author).to.be.equal('old author value');
      expect(req.book.genre).to.be.equal('old genre value');
      expect(req.book.read).to.be.equal(false);
      done();
    });
    it('updateOne: should only update author', (done) => {
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
          author: book.author
        }
      };
      bookController.updateOne(req, res);
      expect(MockBook.findById.args[0][0]).to.equal(book._v);
      expect(req.book.save.calledOnce);
      expect(req.book.title).to.be.equal('old title value');
      expect(req.book.author).to.be.equal(book.author);
      expect(req.book.genre).to.be.equal('old genre value');
      expect(req.book.read).to.be.equal(req.book.read);
      done();
    });
    it('updateOne: should only update genre', (done) => {
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
          genre: book.genre
        }
      };
      bookController.updateOne(req, res);
      expect(MockBook.findById.args[0][0]).to.equal(book._v);
      expect(req.book.save.calledOnce);
      expect(req.book.title).to.be.equal('old title value');
      expect(req.book.author).to.be.equal('old author value');
      expect(req.book.genre).to.be.equal(book.genre);
      expect(req.book.read).to.be.equal(false);
      done();
    });
    it('updateOne: should only update read', (done) => {
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
          read: book.read
        }
      };
      bookController.updateOne(req, res);
      expect(MockBook.findById.args[0][0]).to.equal(book._v);
      expect(req.book.save.calledOnce);
      expect(req.book.title).to.be.equal('old title value');
      expect(req.book.author).to.be.equal('old author value');
      expect(req.book.genre).to.be.equal('old genre value');
      expect(req.book.read).to.be.equal(true);
      done();
    });
    it('deleteOne: should delete', (done) => {
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
          bookId: '1234'
        },
        book: {
          remove: sinon.spy()
        }
      };
      bookController.deleteOne(req, res);
      expect(MockBook.findById.args[0][0]).to.equal('1234');
      expect(req.book.remove.calledOnce);
      expect(res.status.calledWith(204)).to.be.equal(
        false, 'Removed'
      );
      done();
    });
  });

  describe('book-router', () => {
    it('Should have a get, post, get:id, put:id, patch:id, delete:id', (done) => {
      let createCalled = 0;
      let readAllCalled = 0;
      let readOneCalled = 0;
      let updateOneCalled = 0;
      let deleteCalled = 0;
      let mockApp = mockExpress();
      let mockBookController = {
        create: () => {
          createCalled++;
        },
        readAll: () => {
          readAllCalled++;
        },
        readOne: () => {
          readOneCalled++;
        },
        updateOne: () => {
          updateOneCalled++;
        },
        deleteOne: () => {
          deleteCalled++;
        }
      };
      let routes = require('./book-router')(mockBookController);
      mockApp.use('/', routes);

      let req = {};
      let res = {};

      mockApp.invoke('get', '/', req, res);
      mockApp.invoke('post', '/', req, res);
      mockApp.invoke('get', '/hi', req, res);
      mockApp.invoke('put', '/hi', req, res);
      mockApp.invoke('patch', '/hi', req, res);
      mockApp.invoke('delete', '/hi', req, res);

      expect(createCalled).equals(1);
      expect(readAllCalled).equals(1);
      expect(readOneCalled).equals(1);
      expect(updateOneCalled).equals(2);
      expect(deleteCalled).equals(1);
      done();
    });
  });
});
