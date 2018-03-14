let authController = () => {
  let _authenticate = (req, res) => {
    if (!req.body) {
      res.status(400);
      res.send('missing body');
      return;
    }
    if (!req.body.username) {
      res.status(400);
      res.send('missing body.username');
      return;
    }
    if (!req.body.password) {
      res.status(400);
      res.send('missing body.password');
      return;
    }

    if (req.body.username === req.body.password) {
      res.status(200);
      res.send('logged in');
      return;
    }
    res.status(403);
    res.send('not logged in');
    return;
  };

  let _disauthenticate = (req, res) => {
    res.status(200);
    res.send('logged out');
  };

  return {
    login: _authenticate,
    logout: _disauthenticate
  };
};

module.exports = authController;
