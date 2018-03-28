/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const express = require('express');



// router.use(function timeLog(req, res, next) {
//   console.log('auth.js', 'Time: ', Date.now())
//   next()
// })
let routes = (authController) => {
  let authRouter = express.Router();

  authRouter.use('/', (req, res, next) => {
    console.log('in authRouter');
    next();
  });

  // authRouter.get('/', (req, res) => {
  //   res.send({
  //     local: {
  //       links: [
  //         `${req.protocol}://${req.headers.host}/local/login`,
  //         `${req.protocol}://${req.headers.host}/local/logout`
  //       ]
  //     }
  //   });
  // });

  // authRouter.get('/local/login', (req, res) => {
  //   res.send({
  //     err: 'should be POST',
  //     local: {
  //       links: [
  //         `${req.protocol}://${req.headers.host}/local/login`,
  //         `${req.protocol}://${req.headers.host}/local/logout`
  //       ]
  //     }
  //   });
  // });

  authRouter.route('/local/login')
    .post(authController.login);
  authRouter.route('/local/logout')
    .get(authController.logout);

  // authRouter.post('/local/login', (req, res) => {
  //   authController.login(req, res);
  //   // passport.authenticate(
  //   //   'local',
  //   //   { failureRedirect: '/login' },
  //   //   (req, res) => {
  //   //     res.redirect('/loggedin');
  //   //   });
  // });

  // authRouter.get('local/logout', (req, res) => {
  //   authController.logout(req, res);
  //   // req.logout();
  //   // res.redirect('/loggedout');
  // });
  return authRouter;
};

module.exports = routes;

// authRouter.route('/google/callback')
//   .get(passport.authenticate('google', {
//     successRedirect: '/users/',
//     failure: '/error/'
//   }));
// authRouter.route('/google')
//   .get(passport.authenticate('google', {
//     scope: [
//       'https://www.googleapis.com/auth/userinfo.profile',
//       'https://www.googleapis.com/auth/userinfo.email'
//     ]
//   }));

// authRouter.route('/twitter/callback')
//   .get(passport.authenticate('twitter', {
//     successRedirect: '/users/',
//     failure: '/error/'
//   }));
// authRouter.route('/twitter')
//   .get(passport.authenticate('twitter'));

// authRouter.route('/facebook/callback')
//   .get(passport.authenticate('facebook', {
//     successRedirect: '/users/',
//     failure: '/error/'
//   }));
// authRouter.route('/facebook')
//   .get(passport.authenticate('facebook', {
//     scope: [
//       'email'
//     ]
//   }));

// authRouter.route('/github/callback')
//   .get(passport.authenticate('github', {
//     successRedirect: '/users/',
//     failure: '/error/'
//   }));
// authRouter.route('/github')
//   .get(passport.authenticate('github'));


// authRouter.route('/linkedin/callback')
//   .get(passport.authenticate('linkedin', {
//     successRedirect: '/users/',
//     failure: '/error/'
//   }));
// authRouter.route('/linkedin')
//   .get(passport.authenticate('linkedin'));


// authRouter.route('/local/callback')
//   .get(passport.authenticate('local', {
//     successRedirect: '/users/',
//     failure: '/error/'
//   }));
// authRouter.route('/local')
//   .get(passport.authenticate('local'));
