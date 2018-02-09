const express = require('express');
const Book = require('./book-model');

let routes = () => {
  let bookRouter = express.Router();
  let bookController = require('./book-controller')(Book);
  bookRouter.route('/')
    .post(bookController.create)
    .get(bookController.readAll);
  bookRouter.route('/:bookId')
    .get(bookController.readOne)
    .put(bookController.updateOne)
    .patch(bookController.updateOne)
    .delete(bookController.deleteOne);
  return bookRouter;
};

module.exports = routes;
