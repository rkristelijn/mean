const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('../shared/uuid')();

const userModel = new Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String
  },
  salt: {
    type: String
  },
  displayName: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  email: {
    type: String
  },
  facebook: {
    type: Object
  },
  twitter: {
    type: Object
  },
  github: {
    type: Object
  },
  google: {
    type: Object
  },
  linkedin: {
    type: Object
  },
  role: {
    type: Array,
    default: ['user']
  }
});

const User = mongoose.model('User', userModel);

User.schema.pre('save', (next) => {
  if (!this.salt) {
    this.salt = uuid.new();
  }
  next();
});

module.exports = {
  User: User,
  userModel: userModel
};
