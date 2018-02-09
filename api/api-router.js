const express = require('express');
let bookRouter = require('./books/book-router')();

let routes = () => {
  let apiRouter = express.Router();
  apiRouter.use('/', (req, res, next) => {
    next();
  });

  apiRouter.get('/', (req, res) => {
    res.send({
      books: {
        links: `${req.protocol}://${req.headers.host}/api/books`
      }
    });
  });

  apiRouter.use('/books', bookRouter);
  return apiRouter;
};

module.exports = routes;
