/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const express = require('express');
const passport = require('passport');
const pug = require('pug');

let routes = () => {
  let authRouter = express.Router();

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
        res.redirect('/api/auth/local/login');
      });

  authRouter.route('/local/logout')
    .get((req, res) => {
      req.logout();
      res.redirect('/api/auth/local/login');
    });

  return authRouter;
};

module.exports = routes;

