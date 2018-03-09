//todo: know how to use res.send and res.end
let bookController = (bookAdapter) => {
  let _hasBookId = (req, res) => {
    if (!req.params || !req.params.bookId) {
      res.status(400);
      res.send('bookId is required');
      return false;
    }
    return true;
  };
  let _create = (req, res) => {
    bookAdapter.create(req.body, err => {
      res.status(400);
      res.send(err);
    }, (book) => {
      res.status(201);
      res.json(book);
    });
  };
  let _readAll = (req, res) => {
    bookAdapter.query({}, (err) => {
      res.status(400);
      res.send(err);
    }, (books) => {
      res.json(books);
    });
  };
  let _readOne = (req, res) => {
    if (!_hasBookId(req, res)) {
      return;
    }
    bookAdapter.read({
      id: req.params.bookId
    }, err => {
      res.status(400);
      res.end(err);
    }, book => {
      if (!book) {
        res.status(404);
        res.end('Not found');
      } else {
        res.json(book);
      }
    });
  };
  let _updateOne = (req, res) => {
    if (!_hasBookId(req, res)) {
      return;
    }
    req.body.id = req.params.bookId;
    bookAdapter.update(req.body,
      err => {
        res.status(400);
        res.send(err);
      }, (book) => {
        res.json(book);
      });
  };
  let _deleteOne = (req, res) => {
    if (!_hasBookId(req, res)) {
      return;
    }
    bookAdapter.delete({
      id: req.params.bookId
    }, err => {
      res.status(400);
      res.send(err);
    }, book => {
      res.status(204);
      res.send(`Removed ${book}`);
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
module.exports = bookController;
