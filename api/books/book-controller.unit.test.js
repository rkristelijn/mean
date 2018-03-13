const expect = require('chai').expect;
const sinon = require('sinon');
const okId = '000000000000000000000001';
const errId = 'FFFFFFFFFFFFFFFFFFFFFFFF';
const notFoundId = '535cf8e3df3aaa723fc9cad1';


let bookAdapterMock;
let bookController;
let req;
let res;

let forceError = false;

let sampleBook = {
  title: 'The Best Way to Catch a Snake',
  author: 'Karma Yeshe Rabgye',
  isbn: '1505725410',
  language: 'English',
  genre: 'personal development',
  read: false,
  _id: okId,
  _v: okId
};

let templateFunction = (book, bookAdapterErr, bookAdapterSuccess) => {
  if (forceError) {
    forceError = false;
    bookAdapterErr('Connection reset by peer');
    return;
  }

  switch (book.id) {
  case errId:
    bookAdapterErr('User Too Ugly');
    break;
  case okId:
    bookAdapterSuccess(sampleBook);
    break;
  case notFoundId:
    bookAdapterSuccess();
    break;
  default:
    bookAdapterSuccess(book);
    break;
  }
};

beforeEach((done) => {
  bookAdapterMock = {
    create: sinon.spy(templateFunction),
    query: sinon.spy(templateFunction),
    read: sinon.spy(templateFunction),
    update: sinon.spy(templateFunction),
    delete: sinon.spy(templateFunction)
  };
  bookController = require('./book-controller')(bookAdapterMock);
  req = {
    body: 'bodyid',
    params: {
      bookId: 'paramsid'
    }
  };
  res = {
    status: sinon.spy(),
    json: sinon.spy(),
    send: sinon.spy(),
    end: sinon.spy()
  };
  done();
});
describe('book-controller', () => {
  describe('Create', () => {
    it('Should create', (done) => {
      bookController.create(req, res);
      expect(bookAdapterMock.create.args[0][0]).to.be.equal('bodyid');
      done();
    });
    it('Should throw error on mock Adapter', (done) => {
      forceError = true;
      bookController.create(req, res);
      expect(res.status.args[0][0]).to.be.equal(400);
      expect(res.send.args[0][0]).to.be.equal('Connection reset by peer');
      done();
    });
  });
  describe('ReadAll', () => {
    it('Should query', (done) => {
      bookController.readAll(req, res);
      expect(bookAdapterMock.query.args[0][0]).to.be.deep.equal({});
      done();
    });
    it('Should throw error on mock Adapter', (done) => {
      forceError = true;
      bookController.readAll({}, res);
      expect(res.status.args[0][0]).to.be.equal(400);
      expect(res.send.args[0][0]).to.be.equal('Connection reset by peer');
      done();
    });
  });
  describe('ReadOne', () => {
    it('Should read', (done) => {
      bookController.readOne(req, res);
      expect(bookAdapterMock.read.args[0][0]).to.be.deep.equal({ id: 'paramsid' });
      done();
    });
    it('Should throw error on mock Adapter', (done) => {
      bookController.readOne({
        params: {
          bookId: errId
        }
      }, res);
      expect(res.status.args[0][0]).to.be.equal(400);
      expect(res.send.args[0][0]).to.be.equal('User Too Ugly');
      done();
    });
    it('Should throw error on empty book', (done) => {
      bookController.readOne({
        params: {
          bookId: notFoundId
        }
      }, res);
      expect(res.status.args[0][0]).to.be.equal(404);
      expect(res.send.args[0][0]).to.be.equal('Not found');
      done();
    });
    it('Should throw error on empty req.params', (done) => {
      req.params = {};
      bookController.readOne(req, res);
      expect(res.status.args[0][0]).to.be.equal(400);
      expect(res.send.args[0][0]).to.be.equal('bookId is required');
      done();
    });
    it('Should throw error on empty req', (done) => {
      req = {};
      bookController.readOne(req, res);
      expect(res.status.args[0][0]).to.be.equal(400);
      expect(res.send.args[0][0]).to.be.equal('bookId is required');
      done();
    });
  });
  describe('UpdateOne', () => {
    it('Should update', (done) => {
      bookController.updateOne({
        body: sampleBook,
        params: {
          bookId: okId
        }
      }, res);
      expect(bookAdapterMock.update.args[0][0]).has.property('id', okId);
      done();
    });
    it('Should throw error on mock Adapter', (done) => {
      bookController.updateOne({
        body: sampleBook,
        params: {
          bookId: errId
        }
      }, res);
      expect(res.status.args[0][0]).to.be.equal(400);
      expect(res.send.args[0][0]).to.be.equal('User Too Ugly');
      done();
    });
    it('Should throw error on empty req.params', (done) => {
      req.params = {};
      bookController.updateOne(req, res);
      expect(res.status.args[0][0]).to.be.equal(400);
      expect(res.send.args[0][0]).to.be.equal('bookId is required');
      done();
    });
    it('Should throw error on empty req', (done) => {
      req = {};
      bookController.updateOne(req, res);
      expect(res.status.args[0][0]).to.be.equal(400);
      expect(res.send.args[0][0]).to.be.equal('bookId is required');
      done();
    });
  });
  describe('DeleteOne', () => {
    it('Should delete', (done) => {
      bookController.deleteOne({
        params: {
          bookId: okId
        }
      }, res);
      expect(bookAdapterMock.delete.args[0][0]).to.be.deep.equal({
        id: okId
      });
      done();
    });
    it('Should throw error on mock Adapter', (done) => {
      bookController.deleteOne({
        params: {
          bookId: errId
        }
      }, res);
      expect(res.status.args[0][0]).to.be.equal(400);
      expect(res.send.args[0][0]).to.be.equal('User Too Ugly');
      done();
    });
    it('Should throw error on empty req.params', (done) => {
      req.params = {};
      bookController.deleteOne(req, res);
      expect(res.status.args[0][0]).to.be.equal(400);
      expect(res.send.args[0][0]).to.be.equal('bookId is required');
      done();
    });
    it('Should throw error on empty req', (done) => {
      req = {};
      bookController.deleteOne(req, res);
      expect(res.status.args[0][0]).to.be.equal(400);
      expect(res.send.args[0][0]).to.be.equal('bookId is required');
      done();
    });
  });
});
