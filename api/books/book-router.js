const express = require('express');

let routes = (bookController) => {
  let bookRouter = express.Router();
  bookRouter.route('/')
    .post(bookController.create)
    .get(bookController.readAll)
    .delete((req, res) => {
      res.status(404);
      res.send('Not Found');
    });
  bookRouter.route('/:bookId')
    .get(bookController.readOne)
    .put(bookController.updateOne)
    .patch(bookController.updateOne)
    .delete(bookController.deleteOne);
  return bookRouter;
};

module.exports = routes;
