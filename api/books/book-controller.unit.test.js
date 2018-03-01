const expect = require('chai').expect;
const sinon = require('sinon');

let bookAdapterMock;
let bookController;
let req;
let res;

beforeEach((done) => {
  bookAdapterMock = {
    create: sinon.spy(),
    query: sinon.spy(),
    read: sinon.spy(),
    update: sinon.spy(),
    delete: sinon.spy()
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
    send: sinon.spy()
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
  });
  describe('ReadAll', () => {
    it('Should query', (done) => {
      bookController.readAll(req, res);
      expect(bookAdapterMock.query.args[0][0]).to.be.deep.equal({});
      done();
    });
  });
  describe('ReadOne', () => {
    it('Should read', (done) => {
      bookController.readOne(req, res);
      expect(bookAdapterMock.read.args[0][0]).to.be.deep.equal({ id: 'paramsid' });
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
      req.body = { id: 'object' };
      bookController.updateOne(req, res);
      expect(bookAdapterMock.update.args[0][0]).to.be.deep.equal({ id: 'paramsid' });
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
      bookController.deleteOne(req, res);
      expect(bookAdapterMock.delete.args[0][0]).to.be.deep.equal({ id: 'paramsid' });
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
