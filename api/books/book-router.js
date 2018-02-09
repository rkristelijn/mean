const express = require('express');

let routes = (bookController) => {
  let bookRouter = express.Router();
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
