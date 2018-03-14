const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  }
});

module.exports = {
  User: mongoose.model('User', userModel),
  userModel: userModel
};
