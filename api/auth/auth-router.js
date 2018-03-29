/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const express = require('express');
const passport = require('passport');

let routes = () => {
  let authRouter = express.Router();

  authRouter.use('/', (req, res, next) => {
    console.log('in authRouter');
    next();
  });

  authRouter.route('/local/login')
    .get((req, res) => {
      console.log('in get');
      res.end('login form');
    })
    .post(
      passport.authenticate('local'),
      (req, res) => {
        console.log('in post');
        res.end('login success');
      });

  authRouter.route('/local/logout')
    .get((req, res) => {
      req.logout();
      res.end('logout success');
    });

  return authRouter;
};

module.exports = routes;

