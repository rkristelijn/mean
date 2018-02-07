const express = require('express');
const Book = require('./book-model');

let routes = function () {
  let bookRouter = express.Router();

  let bookController = require('./book-controller')(Book);
  bookRouter.route('/')
    .post(bookController.post)
    .get(bookController.get);

  console.log('hooi');
  return bookRouter;
};

module.exports = routes;
