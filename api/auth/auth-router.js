/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const express = require('express');
const passport = require('passport');
const pug = require('pug');

let routes = () => {
  let authRouter = express.Router();

  authRouter.use('/', (req, res, next) => {
    console.log('in authRouter');
    next();
  });

  authRouter.route('/local/login')
    .get((req, res) => {
      let loggedIn = false;
      if (req.user) {
        loggedIn = true;
      }
      res.end(pug.renderFile(__dirname + '/login-form.pug',
        {
          actionUrl: '/api/auth/local/login',
          loggedIn: loggedIn
        }
      ));
    })
    .post(
      passport.authenticate('local'),
      (req, res) => {
        console.log('in post of login');
        //res.end('login success');
        res.redirect('/api/auth/local/login');
      });

  authRouter.route('/local/logout')
    .get((req, res) => {
      console.log('in get of logout');
      req.logout();
      //res.end('logout success');
      res.redirect('/api/auth/local/login');
    });

  return authRouter;
};

module.exports = routes;

