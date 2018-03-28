/* eslint-disable max-nested-callbacks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const expect = require('chai').expect;
const sinon = require('sinon');

let res;
let authController;

beforeEach((done) => {
  //authController = require('./auth-controller')();
  res = {
    status: sinon.spy(),
    json: sinon.spy(),
    send: sinon.spy(),
    end: sinon.spy()
  };
  done();
});

describe('auth-controller', () => {
  describe('Login', () => {
    xit('Should login', (done) => {
      let req = {
        body: {
          username: 'hello',
          password: 'hello'
        }
      };
      authController.login(req, res);
      expect(res.status.args[0][0]).to.be.equal(200);
      expect(res.send.args[0][0]).to.be.equal('logged in');
      done();
    });
    xit('Should not login - wrong credentials', (done) => {
      let req = {
        body: {
          username: 'hello',
          password: 'world'
        }
      };
      authController.login(req, res);
      expect(res.status.args[0][0]).to.be.equal(403);
      expect(res.send.args[0][0]).to.be.equal('not logged in');
      done();
    });
    xit('Should not login missing username', (done) => {
      let req = {
        body: {
          password: 'world'
        }
      };
      authController.login(req, res);
      expect(res.status.args[0][0]).to.be.equal(400);
      expect(res.send.args[0][0]).to.be.equal('missing body.username');
      done();
    });
    xit('Should not login missing password', (done) => {
      let req = {
        body: {
          username: 'world'
        }
      };
      authController.login(req, res);
      expect(res.status.args[0][0]).to.be.equal(400);
      expect(res.send.args[0][0]).to.be.equal('missing body.password');
      done();
    });
    xit('Should not login missing body', (done) => {
      let req = {
      };
      authController.login(req, res);
      expect(res.status.args[0][0]).to.be.equal(400);
      expect(res.send.args[0][0]).to.be.equal('missing body');
      done();
    });
  });
  describe('Logout', () => {
    xit('Should logout', (done) => {
      authController.logout({}, res);
      expect(res.status.args[0][0]).to.be.equal(200);
      expect(res.send.args[0][0]).to.be.equal('logged out');
      done();
    });
  });
});
