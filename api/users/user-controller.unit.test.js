const expect = require('chai').expect;
const sinon = require('sinon');
const okId = '000000000000000000000001';
const errId = 'FFFFFFFFFFFFFFFFFFFFFFFF';
const notFoundId = '535cf8e3df3aaa723fc9cad1';


let userAdapterMock;
let userController;
let req;
let res;

let forceError = false;

let sampleuser = {
  username: 'scott',
  password: 'tiger',
  displayName: 'Bruce Scott',
  image: 'http://www.orafaq.com/wiki/images/c/c1/Bruce_Scott.jpg',
  email: 'b.scott@oracle.com',
  _id: okId,
  _v: okId
};

let templateFunction = (user, userAdapterErr, userAdapterSuccess) => {
  if (forceError) {
    forceError = false;
    userAdapterErr('Connection reset by peer');
    return;
  }

  switch (user.id) {
  case errId:
    userAdapterErr('User Too Ugly');
    break;
  case okId:
    userAdapterSuccess(sampleuser);
    break;
  case notFoundId:
    userAdapterSuccess();
    break;
  default:
    userAdapterSuccess(user);
    break;
  }
};

describe('user-controller', () => {
  beforeEach((done) => {
    userAdapterMock = {
      create: sinon.spy(templateFunction),
      query: sinon.spy(templateFunction),
      read: sinon.spy(templateFunction),
      update: sinon.spy(templateFunction),
      delete: sinon.spy(templateFunction)
    };
    userController = require('./user-controller')(userAdapterMock);
    req = {
      body: 'bodyid',
      params: {
        userId: 'paramsid'
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

  describe('Create', () => {
    it('Should create', (done) => {
      userController.create(req, res);
      expect(userAdapterMock.create.args[0][0]).to.be.equal('bodyid');
      done();
    });
    it('Should throw error on mock Adapter', (done) => {
      forceError = true;
      userController.create(req, res);
      expect(res.status.args[0][0]).to.be.equal(400);
      expect(res.send.args[0][0]).to.be.equal('Connection reset by peer');
      done();
    });
  });
  describe('ReadAll', () => {
    it('Should query', (done) => {
      userController.readAll(req, res);
      expect(userAdapterMock.query.args[0][0]).to.be.deep.equal({});
      done();
    });
    it('Should throw error on mock Adapter', (done) => {
      forceError = true;
      userController.readAll({}, res);
      expect(res.status.args[0][0]).to.be.equal(400);
      expect(res.send.args[0][0]).to.be.equal('Connection reset by peer');
      done();
    });
  });
  describe('ReadOne', () => {
    it('Should read', (done) => {
      userController.readOne(req, res);
      expect(userAdapterMock.read.args[0][0]).to.be.deep.equal({ id: 'paramsid' });
      done();
    });
    it('Should throw error on mock Adapter', (done) => {
      userController.readOne({
        params: {
          userId: errId
        }
      }, res);
      expect(res.status.args[0][0]).to.be.equal(400);
      expect(res.send.args[0][0]).to.be.equal('User Too Ugly');
      done();
    });
    it('Should throw error on empty user', (done) => {
      userController.readOne({
        params: {
          userId: notFoundId
        }
      }, res);
      expect(res.status.args[0][0]).to.be.equal(404);
      expect(res.send.args[0][0]).to.be.equal('Not found');
      done();
    });
    it('Should throw error on empty req.params', (done) => {
      req.params = {};
      userController.readOne(req, res);
      expect(res.status.args[0][0]).to.be.equal(400);
      expect(res.send.args[0][0]).to.be.equal('userId is required');
      done();
    });
    it('Should throw error on empty req', (done) => {
      req = {};
      userController.readOne(req, res);
      expect(res.status.args[0][0]).to.be.equal(400);
      expect(res.send.args[0][0]).to.be.equal('userId is required');
      done();
    });
  });
  describe('UpdateOne', () => {
    it('Should update', (done) => {
      userController.updateOne({
        body: sampleuser,
        params: {
          userId: okId
        }
      }, res);
      expect(userAdapterMock.update.args[0][0]).has.property('id', okId);
      done();
    });
    it('Should throw error on mock Adapter', (done) => {
      userController.updateOne({
        body: sampleuser,
        params: {
          userId: errId
        }
      }, res);
      expect(res.status.args[0][0]).to.be.equal(400);
      expect(res.send.args[0][0]).to.be.equal('User Too Ugly');
      done();
    });
    it('Should throw error on empty req.params', (done) => {
      req.params = {};
      userController.updateOne(req, res);
      expect(res.status.args[0][0]).to.be.equal(400);
      expect(res.send.args[0][0]).to.be.equal('userId is required');
      done();
    });
    it('Should throw error on empty req', (done) => {
      req = {};
      userController.updateOne(req, res);
      expect(res.status.args[0][0]).to.be.equal(400);
      expect(res.send.args[0][0]).to.be.equal('userId is required');
      done();
    });
  });
  describe('DeleteOne', () => {
    it('Should delete', (done) => {
      userController.deleteOne({
        params: {
          userId: okId
        }
      }, res);
      expect(userAdapterMock.delete.args[0][0]).to.be.deep.equal({
        id: okId
      });
      done();
    });
    it('Should throw error on mock Adapter', (done) => {
      userController.deleteOne({
        params: {
          userId: errId
        }
      }, res);
      expect(res.status.args[0][0]).to.be.equal(400);
      expect(res.send.args[0][0]).to.be.equal('User Too Ugly');
      done();
    });
    it('Should throw error on empty req.params', (done) => {
      req.params = {};
      userController.deleteOne(req, res);
      expect(res.status.args[0][0]).to.be.equal(400);
      expect(res.send.args[0][0]).to.be.equal('userId is required');
      done();
    });
    it('Should throw error on empty req', (done) => {
      req = {};
      userController.deleteOne(req, res);
      expect(res.status.args[0][0]).to.be.equal(400);
      expect(res.send.args[0][0]).to.be.equal('userId is required');
      done();
    });
  });
});
