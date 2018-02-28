let bookController = (Book) => {
  let bookAdapter = require('./book-adapter')(Book);
  let _create = (req, res) => {
    bookAdapter.create(req.body, err => {
      res.status(400).send(err);
    }, (book) => {
      res.status(201);
      res.json(book);
    });
  };
  let _readAll = (req, res) => {
    bookAdapter.query({}, (err) => {
      res.status(400).send(err);
    }, (books) => {
      res.json(books);
    });
  };
  let _readOne = (req, res) => {
    if (!req.params.bookId) {
      res.status(400);
      res.send('bookId is required');
      return;
    }
    bookAdapter.read({
      id: req.params.bookId
    }, err => {
      res.status(400).send(err);
    }, book => {
      res.json(book);
    });
  };
  let _updateOne = (req, res) => {
    req.body.id = req.params.bookId;
    bookAdapter.update(req.body,
      err => {
        res.status(400).send(err);
      }, (book) => {
        res.json(book);
      });
  };
  let _deleteOne = (req, res) => {
    bookAdapter.delete({
      id: req.params.bookId
    }, err => {
      res.status(400).send(err);
    }, book => {
      res.status(204).send(`Removed ${book}`);
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
