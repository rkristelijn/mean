const express = require('express');

const Book = require('./books/book-model').Book;
let bookAdapter = require('./books/book-adapter')(Book);
let bookController = require('./books/book-controller')(bookAdapter);
let bookRouter = require('./books/book-router')(bookController);

let User = require('./users/user-model').User;
let useAdapter = require('./users/user-adapter')(User);
let userController = require('./users/user-controller')(useAdapter);
let userRouter = require('./users/user-router')(userController);

let authRouter = require('./auth/auth-router')();

let routes = () => {
  let apiRouter = express.Router();
  // apiRouter.use('/', (req, res, next) => {
  //   console.log('in apiRouter');
  //   next();
  // });

  apiRouter.get('/', (req, res) => {
    res.send({
      books: {
        links: `${req.protocol}://${req.headers.host}/api/books`
      }
    });
  });

  apiRouter.use('/books', bookRouter);
  apiRouter.use('/users', userRouter);
  apiRouter.use('/auth', authRouter);
  return apiRouter;
};

module.exports = routes;
