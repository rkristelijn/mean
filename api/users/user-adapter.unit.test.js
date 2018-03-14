/* eslint-disable max-nested-callbacks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const expect = require('chai').expect;
const userModel = require('./user-model').userModel;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);

let id = '';
let id2 = '';
let idErr = '';
let skipOnce = false;

userModel.pre('remove', function (next) {
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
userModel.pre('save', function (next) {
  if (this.title === 'Turbo Man') {
    let err = new Error('Need to get a Turbo Man for Christmas');
    next(err);
  }
  next();
});
userModel.pre('find', function (next) {
  if (this._conditions.title === 'Turbo Man') {
    let err = new Error('Need to get a Turbo Man for Christmas');
    next(err);
  }
  next();
});
userModel.pre('findOne', function (next) {
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
        expect(err.message.substr(0,26)).to.be.equal('TestUser validation failed');
        done();
      }, user => {
        expect(user).to.be.equal('undefined');
      });
    });
    it('Create with no displayName should throw error', (done) => {
      userAdapter.create({
        username: 'hooi'
      }, (err) => {
        expect(err.message.substr(0,26)).to.be.equal('TestUser validation failed');
        done();
      }, user => {
        expect(user.title).to.equal('hooi');
        expect(user.read).to.equal(false);
        id = user._id.toString();
        done();
      });
    });
    it('Should create', (done) => {
      userAdapter.create({
        username: 'henk',
        displayName: 'Henk Stubbe'
      }, (err) => {
        expect(err.message).to.be.equal('undefined');
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
    xit('Read without userId should throw error', done => {
      userAdapter.read(id, (err) => {
        expect(err).to.be.equal('userId is required');
        done();
      }, user => {
        expect(user).to.be('undefined');
        done();
      });
    });
    xit('Read should return a user that was just created', done => {
      userAdapter.read({ id: id }, (err) => {
        expect(err).to.be('undefined');
        done();
      }, user => {
        expect(user.title).to.equal('hooi');
        expect(user.read).to.equal(false);
        done();
      });
    });
    xit('Should raise non-Id on delete when Id is \'For great justice.\'', (done) => {
      userAdapter.read({ id: 'For great justice.' }, err => {
        expect(err).to.equal('Cast to ObjectId failed for value: For great justice.');
        done();
      }, (user) => {
        expect(user).to.be('undefined');
        done();
      });
    });
  });
  describe('Update', () => {
    xit('Update should add a genre', done => {
      userAdapter.update({
        id: id,
        genre: 'Some genre'
      }, (err) => {
        expect(err).to.be('undefined');
        done();
      }, user => {
        expect(user.title).to.equal('hooi');
        expect(user.genre).to.equal('Some genre');
        expect(user.read).to.equal(false);
        done();
      });
    });
    xit('Update should add a author', done => {
      userAdapter.update({
        id: id,
        author: 'Some author'
      }, (err) => {
        expect(err).to.be('undefined');
        done();
      }, user => {
        expect(user.title).to.equal('hooi');
        expect(user.genre).to.equal('Some genre');
        expect(user.author).to.equal('Some author');
        expect(user.read).to.equal(false);
        done();
      });
    });
    xit('Should raise Turbo Man error on update', (done) => {
      userAdapter.update({
        id: id,
        title: 'Turbo Man',
        author: 'Some other author'
      }, (err) => {
        expect(err).to.equal('Cannot save user: Error: Need to get a Turbo Man for Christmas');
        done();
      }, user => {
        expect(user.title).to.equal('this is not right');
        done();
      });
    });
    xit('Should raise not-found-error on update', (done) => {
      idErr = mongoose.Types.ObjectId(id);
      userAdapter.update({
        id: id,
        title: 'What\'s a body gotta do, to get a drink of soda pop around here?',
        author: 'Some other author'
      }, (err) => {
        expect(err).to.equal('Cannot find user: Error: Need to get a Turbo Man for Christmas');
        idErr = '';
        done();
      }, user => {
        expect(user.title).to.equal('this is not right');
        idErr = '';
        done();
      });
    });
    xit('Should raise non-Id error on update when Id is \'Take off every ZIG!\'', (done) => {
      userAdapter.update({
        id: 'Take off every ZIG!',
        title: 'Zero Wing',
        author: 'Cats'
      }, (err) => {
        expect(err).to.equal('Cast to ObjectId failed for value: Take off every ZIG!');
        done();
      }, user => {
        expect(user.title).to.equal('this is not right');
        done();
      });
    });
  });
  describe('Query', () => {
    xit('Should create another one', (done) => {
      userAdapter.create({
        title: 'haai'
      }, (err) => {
        expect(err).to.be('undefined');
        done();
      }, user => {
        expect(user.title).to.equal('haai');
        expect(user.read).to.equal(false);
        id2 = user._id.toString();
        done();
      });
    });
    xit('Should return two items', (done) => {
      userAdapter.query({}, err => {
        expect(err).to.be('undefined');
        done();
      }, users => {
        expect(users.length).to.equal(2);
        done();
      });
    });
    xit('Should raise Turbo Man error on query', (done) => {
      userAdapter.query({title: 'Turbo Man'}, err => {
        expect(err).to.equal('Cannot find user: Error: Need to get a Turbo Man for Christmas');
        done();
      }, users => {
        expect(users).to.equal('Should throw error');
        done();
      });
    });
  });
  describe('Delete', () => {
    xit('Should raise cannot remove on delete', (done) => {
      idErr = id;
      skipOnce = true;
      userAdapter.delete({ id: id }, err => {
        expect(err).to.equal('Cannot remove user: Error: Need to get a Turbo Man for Christmas');
        done();
      }, (user) => {
        expect(user).to.be('undefined');
        done();
      });
    });
    xit('Should delete one item', (done) => {
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
    xit('Should delete all items', (done) => {
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
    xit('Should raise Turbo Man error on delete', (done) => {
      userAdapter.create({
        title: 'Turbo Man'
      }, (err) => {
        done();
      }, user => {
        userAdapter.delete({ id: user.id }, err => {
          expect(err).to.equal('Cannot remove user: Error: Need to get a Turbo Man for Christmas');
          done();
        }, (user) => {
          expect(user).to.be('undefined');
          done();
        });
      });
    });
    xit('Should raise not-found-error on delete', (done) => {
      userAdapter.delete({ id: '000000000000000000000001' }, err => {
        expect(err).to.equal('Cannot find user: 000000000000000000000001');
        done();
      }, (user) => {
        expect(user).to.be('undefined');
        done();
      });
    });
    xit('Should raise non-Id on delete when Id is \'All your base are belong to us!\'', (done) => {
      userAdapter.delete({ id: 'All your base are belong to us!' }, err => {
        expect(err).to.equal('Cast to ObjectId failed for value: All your base are belong to us!');
        done();
      }, (user) => {
        expect(user).to.be('undefined');
        done();
      });
    });
  });
});
