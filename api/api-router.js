const express = require('express');
const Book = require('./books/book-model').Book;
let bookAdapter = require('./books/book-adapter')(Book);
let bookController = require('./books/book-controller')(bookAdapter);
let bookRouter = require('./books/book-router')(bookController);
let authController = require('./auth/auth-controller')();
let authRouter = require('./auth/auth-router')(authController);

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
  apiRouter.use('/auth', authRouter);
  return apiRouter;
};

module.exports = routes;
