let userAdapter = (User) => {
  let _create = (user, userAdapterErr, userAdapterSuccess) => {
    let _user = new User(user);
    _user.save((err, userResult) => {
      if (err) {
        userAdapterErr(err.message);
        return;
      }
      userAdapterSuccess(userResult);
    });
  };
  let _read = (user, userAdapterErr, userAdapterSuccess) => {
    if (!user || !user.id) {
      userAdapterErr('user.id is required');
      return;
    }
    User.findById(user.id, (err, userResult) => {
      if (err) {
        userAdapterErr(err.message);
        return;
      }
      userAdapterSuccess(userResult);
    });
  };
  let _update = (user, userAdapterErr, userAdapterSuccess) => {
    _read(user, err => {
      userAdapterErr(err);
      return;
    }, (_user) => {
      if (!_user) {
        userAdapterErr('Not found');
        return;
      }
      for (let member in user) {
        if (member !== 'id') {
          _user[member] = user[member];
        }
      }
      _user.save((err, userResult) => {
        if (err) {
          userAdapterErr(err.message);
        }
        userAdapterSuccess(userResult);
      });
    });
  };
  let _delete = (user, userAdapterErr, userAdapterSuccess) => {
    /* eslint-disable no-unused-vars */
    User.findById(user.id, (findErr, userResult) => {
      if (findErr) {
        userAdapterErr(findErr.message);
      }
      if (!userResult) {
        userAdapterErr('Not Found');
      }
      /* eslint-disable no-unused-vars */
      userResult.remove((err) => {
        if (err) {
          userAdapterErr(err.message);
        }
        userAdapterSuccess(user);
      });
    });
  };
  let _query = (query, userAdapterErr, userAdapterSuccess) => {
    /* eslint-disable no-unused-vars */
    User.find(query, (err, users) => {
      if (err) {
        userAdapterErr(err.message);
      }
      userAdapterSuccess(users);
    });
  };

  return {
    create: _create,
    read: _read,
    update: _update,
    delete: _delete,
    query: _query
  };
};
module.exports = userAdapter;
