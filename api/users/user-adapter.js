let userAdapter = (User) => {
  let _create = (user, userAdapterErr, userAdapterSuccess) => {
    let _user = new User(user);
    _user.save((err, userResult) => {
      if(err) {
        userAdapterErr(err);
      }
      userAdapterSuccess(userResult);
    });
  };
  let _read = (user, userAdapterErr, userAdapterSuccess) => {
    user.findById(user.id, (err, userResult) => {
      userAdapterSuccess(userResult);
    });
  };
  let _update = (user, userAdapterErr, userAdapterSuccess) => {
    _read(user, err => {
      userAdapterErr(err);
      return;
    }, (_user) => {
      for (let member in user) {
        if (member !== 'id') {
          _user[member] = user[member];
        }
      }
      _user.save((err, userResult) => {
        userAdapterSuccess(userResult);
      });
    });
  };
  let _delete = (user, userAdapterErr, userAdapterSuccess) => {
    /* eslint-disable no-unused-vars */
    user.findById(user.id, (findErr, userResult) => {
    /* eslint-disable no-unused-vars */
      userResult.remove((err) => {
        userAdapterSuccess(user);
      });
    });
  };
  let _query = (query, userAdapterErr, userAdapterSuccess) => {
    /* eslint-disable no-unused-vars */
    User.find(query, (err, users) => {
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
