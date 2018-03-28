/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
let passport = require('passport');

let authController = () => {
  let _login = (req, res) => {
    console.log('_login', req.body);
    if (!req.body || !req.body.username) {
      res.status(400);
      res.end('no body');
      return;
    }
    passport.authenticate(
      'local',
      { failureRedirect: '/login' },
      (req, res) => {
        console.log('all seems ok');
        //res.redirect('/loggedin');

        res.status(200);
        res.send('logged in');
        return;
      });

    return;
  };

  let _logout = (req, res) => {
    req.logout();
    res.redirect('/loggedout');
  };

  return {
    login: _login,
    logout: _logout
  };
};

module.exports = authController;

// let passport = require('./passport');
// let authController = () => {
//   let _authenticate = (req, res) => {
//     if (!req.body) {
//       res.status(400);
//       res.send('missing body');
//       return;
//     }
//     if (!req.body.username) {
//       res.status(400);
//       res.send('missing body.username');
//       return;
//     }
//     if (!req.body.password) {
//       res.status(400);
//       res.send('missing body.password');
//       return;
//     }

//     passport.authenticate('local', { failureRedirect: '/login' });
//     res.status(200);
//     res.send('logged in');
//     return;
//   }
//   res.status(403);
//   res.send('not logged in');
//   return;
// };

// let _disauthenticate = (req, res) => {
//   req.logout();
//   res.status(200);
//   res.send('logged out');
// };

// return {
//   login: _authenticate,
//   logout: _disauthenticate
// };
// };

// module.exports = authController;
