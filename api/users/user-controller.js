let userController = (userAdapter) => {
  let _hasuserId = (req, res) => {
    if (!req.params || !req.params.userId) {
      res.status(400);
      res.send('userId is required');
      return false;
    }
    return true;
  };
  let _create = (req, res) => {
    userAdapter.create(req.body, err => {
      res.status(400);
      res.send(err);
    }, (user) => {
      res.status(201);
      res.json(user);
    });
  };
  let _readAll = (req, res) => {
    userAdapter.query({},
      err => {
        res.status(400);
        res.send(err);
      }, (users) => {
        res.json(users);
      });
  };
  let _readOne = (req, res) => {
    if (!_hasuserId(req, res)) {
      return;
    }
    userAdapter.read({
      id: req.params.userId
    }, err => {
      res.status(400);
      res.send(err);
    }, user => {
      if (!user) {
        res.status(404);
        res.send('Not found');
      } else {
        res.json(user);
      }
    });
  };
  let _updateOne = (req, res) => {
    if (!_hasuserId(req, res)) {
      return;
    }
    req.body.id = req.params.userId;
    userAdapter.update(req.body,
      err => {
        res.status(400);
        res.send(err);
      }, (user) => {
        res.json(user);
      });
  };
  let _deleteOne = (req, res) => {
    if (!_hasuserId(req, res)) {
      return;
    }
    userAdapter.delete({
      id: req.params.userId
    }, err => {
      res.status(400);
      res.send(err);
    }, () => {
      res.status(204);
    });
  };

  return {
    create: _create,
    readOne: _readOne,
    readAll: _readAll,
    updateOne: _updateOne,
    deleteOne: _deleteOne
  };
};
module.exports = userController;
