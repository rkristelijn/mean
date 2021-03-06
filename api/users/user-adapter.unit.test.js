/* eslint-disable max-nested-callbacks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const expect = require('chai').expect;
const userModel = require('./user-model').userModel;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);

const okId = '000000000000000000000001';
const errId = 'FFFFFFFFFFFFFFFFFFFFFFFF';
const notFoundId = '535cf8e3df3aaa723fc9cad1';

let id = '';
let id2 = '';
let idErr = '';
let skipOnce = false;

let controlledErrorHook = (id, next) => {
  if (typeof id !== 'object') {
    next();
    return;
  }

  if (id.equals(idErr)) {
    if (!skipOnce) {
      let err = new Error('Need to get a Turbo Man for Christmas');
      idErr = '';
      next(err);
      return;
    }
    skipOnce = false;
    next();
    return;
  }

  next();
};

userModel.pre('remove', function (next) {
  controlledErrorHook(this._id, next);
});
userModel.pre('save', function (next) {
  controlledErrorHook(this._id, next);
});
userModel.pre('find', function (next) {
  controlledErrorHook(this._conditions._id, next);
});
userModel.pre('findOne', function (next) {
  controlledErrorHook(this._conditions._id, next);
});

const userAdapter = require('./user-adapter')(mongoose.model('TestUser', userModel));

before((done) => {
  mockgoose.prepareStorage().then(() => {
    mongoose.connect('mongodb://localhost/userAPI',
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

describe('user-adapter', () => {
  describe('Create', () => {
    it('Create with no data should throw error', (done) => {
      userAdapter.create({}, (err) => {
        expect(err.substr(0, 26)).to.be.equal('TestUser validation failed');
        done();
      }, user => {
        expect(user).to.be.equal('undefined');
      });
    });
    it('Create with no displayName should throw error', (done) => {
      userAdapter.create({
        username: 'hooi'
      }, (err) => {
        expect(err.substr(0, 26)).to.be.equal('TestUser validation failed');
        done();
      }, user => {
        expect(user.username).to.equal('should not succeed');
        done();
      });
    });
    it('Should create', (done) => {
      userAdapter.create({
        username: 'henk',
        displayName: 'Henk Stubbe'
      }, (err) => {
        expect(err).to.be.equal('undefined');
        done();
      }, user => {
        expect(user.username).to.equal('henk');
        expect(user.displayName).to.equal('Henk Stubbe');
        id = user._id.toString();
        done();
      });
    });
  });
  describe('Read', () => {
    it('Read without user.id should throw error', done => {
      userAdapter.read(id, (err) => {
        expect(err).to.be.equal('user.id is required');
        done();
      }, user => {
        expect(user).to.be('should not succeed');
        done();
      });
    });
    it('Read should return a user that was just created', done => {
      userAdapter.read({ id: id }, (err) => {
        expect(err).to.be('should not throw error');
        done();
      }, user => {
        expect(user.username).to.equal('henk');
        expect(user.displayName).to.equal('Henk Stubbe');
        done();
      });
    });
    it('Should raise non-Id on read when Id is \'For great justice.\'', (done) => {
      userAdapter.read({ id: 'For great justice.' }, err => {
        expect(err.substr(0, 33)).to.be.equal('Cast to ObjectId failed for value');
        done();
      }, (user) => {
        expect(user).to.be('should not succeed');
        done();
      });
    });
  });
  describe('Update', () => {
    it('Update should add an image', done => {
      userAdapter.update({
        id: id,
        image: 'https://i.warosu.org/data/tg/img/0291/88/1388516488408.png'
      }, (err) => {
        expect(err).to.be('should not throw error');
        done();
      }, user => {
        expect(user.username).to.equal('henk');
        expect(user.displayName).to.equal('Henk Stubbe');
        expect(user.image).to.equal('https://i.warosu.org/data/tg/img/0291/88/1388516488408.png');
        done();
      });
    });
    it('Update should add a password', done => {
      userAdapter.update({
        id: id,
        password: 'BZ@KzlbWInit5QW'
      }, (err) => {
        expect(err).to.be('should not throw error');
        done();
      }, user => {
        expect(user.username).to.equal('henk');
        expect(user.displayName).to.equal('Henk Stubbe');
        expect(user.image).to.equal('https://i.warosu.org/data/tg/img/0291/88/1388516488408.png');
        expect(user.password).to.equal('BZ@KzlbWInit5QW');
        done();
      });
    });
    it('Should raise Turbo Man error on update', (done) => {
      idErr = mongoose.Types.ObjectId(id);
      skipOnce = true;
      userAdapter.update({
        id: id,
        displayName: 'Turbo Man'
      }, (err) => {
        expect(err).to.equal('Need to get a Turbo Man for Christmas');
        done();
      }, user => {
        expect(user.displayName).not.to.equal('Turbo Man');
        done();
      });
    });
    it('Should raise not-found-error on update', (done) => {
      userAdapter.update({
        id: notFoundId,
        displayName: 'What\'s a body gotta do, to get a drink of soda pop around here?'
      }, (err) => {
        expect(err).to.equal('Not found');
        done();
      }, user => {
        expect(user.displayName).to.equal('this is not right');
        done();
      });
    });
    it('Should raise non-Id error on update when Id is \'Take off every ZIG!\'', (done) => {
      userAdapter.update({
        id: 'Take off every ZIG!',
        displayName: 'Zero Wing',
        author: 'Cats'
      }, (err) => {
        expect(err.substr(0, 33)).to.be.equal('Cast to ObjectId failed for value');
        done();
      }, user => {
        expect(user.title).to.equal('this is not right');
        done();
      });
    });
  });
  describe('Query', () => {
    it('Should create another one', (done) => {
      userAdapter.create({
        username: 'jantje',
        displayName: 'Jantje'
      }, (err) => {
        expect(err).to.be('undefined');
        done();
      }, user => {
        expect(user.username).to.equal('jantje');
        expect(user.displayName).to.equal('Jantje');
        id2 = user._id.toString();
        done();
      });
    });
    it('Should return two items', (done) => {
      userAdapter.query({}, err => {
        expect(err).to.be('undefined');
        done();
      }, users => {
        expect(users.length).to.equal(2);
        done();
      });
    });
    it('Should raise Turbo Man error on query', (done) => {
      idErr = mongoose.Types.ObjectId(id2);
      userAdapter.query({ _id: mongoose.Types.ObjectId(id2) }, err => {
        expect(err).to.equal('Need to get a Turbo Man for Christmas');
        done();
      }, users => {
        expect(users).to.equal('Should throw error');
        done();
      });
    });
  });
  describe('Delete', () => {
    it('Should raise cannot remove on delete', (done) => {
      idErr = mongoose.Types.ObjectId(id);
      skipOnce = true;
      userAdapter.delete({ id: idErr }, err => {
        expect(err).to.equal('Need to get a Turbo Man for Christmas');
        done();
      }, (user) => {
        expect(user).to.be('undefined');
        done();
      });
    });
    it('Should delete one item', (done) => {
      userAdapter.delete({ id: id }, err => {
        expect(err).to.be('undefined');
        done();
      }, user => {
        userAdapter.read({ id: user.id }, (err) => {
          expect(err).to.equal('User not found: ' + user.id);
        }, userDeleted => {
          expect(userDeleted).to.equal(null);
        });
        userAdapter.query({}, err => {
          expect(err).to.be('undefined');
          done();
        }, users => {
          expect(users.length).to.equal(1);
          done();
        });
      });
    });
    it('Should delete all items', (done) => {
      userAdapter.delete({ id: id2 }, err => {
        expect(err).to.be('undefined');
        done();
      }, user => {
        userAdapter.read({ id: user.id }, (err) => {
          expect(err).to.equal('User not found: ' + user.id);
        }, userDeleted => {
          expect(userDeleted).to.equal(null);
        });
        userAdapter.query({}, err => {
          expect(err).to.be('undefined');
          done();
        }, users => {
          expect(users.length).to.equal(0);
          done();
        });
      });
    });
    it('Should raise Turbo Man error on delete', (done) => {
      userAdapter.create({
        displayName: 'Turbo Man',
        username: 'turboman'
      }, (err) => {
        expect(err).to.equal('Should not throw error');
        done();
      }, user => {
        idErr = user._id;
        skipOnce = true;
        userAdapter.delete({ id: user.id }, err => {
          expect(err).to.equal('Need to get a Turbo Man for Christmas');
          done();
        }, (user) => {
          expect(user).to.be('Should not succeed');
          done();
        });
      });
    });
    it('Should raise not-found-error on delete', (done) => {
      userAdapter.delete({ id: '000000000000000000000001' }, err => {
        expect(err).to.equal('Not Found');
        done();
      }, (user) => {
        expect(user).to.be('Should not succeed');
        done();
      });
    });
    it('Should raise non-Id on delete when Id is \'All your base are belong to us!\'', (done) => {
      userAdapter.delete({ id: 'All your base are belong to us!' }, err => {
        expect(err.substr(0, 33)).to.be.equal('Cast to ObjectId failed for value');
        done();
      }, (user) => {
        expect(user).to.be('undefined');
        done();
      });
    });
  });
});
