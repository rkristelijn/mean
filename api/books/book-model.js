const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookModel = new Schema({
  title: { type: String },
  author: { type: String },
  genre: { type: String },
  read: {
    type: Boolean,
    default: false
  }
});

// bookModel.pre('remove', (next) => {
//   console.log('deleting from bookModel');
//   next();
// });

module.exports = {
  Book: mongoose.model('Book', bookModel),
  bookModel: bookModel
};
