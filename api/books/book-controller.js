let bookController = (Book) => {
  let _create = (req, res) => {
    let book = new Book(req.body);
    if (!req.body.title) {
      res.status(400);
      res.send('Title is required');
    } else {
      book.save();
      let returnBook = Object.assign({}, book._doc);
      returnBook.links = {};
      returnBook.links.filterByThisGenre = `${req.protocol}://${req.headers.host}`
        + '/api/books?genre='
        + book.genre.replace(' ', '%20');
      res.status(201);
      res.json(returnBook);
    }
  };
  let _readAll = (req, res) => {
    //console.log("_readAll", req);
    let query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    Book.find(query, (err, books) => {
      if (err) {
        res.status(500).send(err);
      } else {
        let returnBooks = [];
        books.forEach(element => {
          let newBook = element.toJSON();
          newBook.links = {};
          newBook.links.self = 'http://'
            + req.headers.host + '/api/books/' + newBook._id;
          returnBooks.push(newBook);
        });
        res.json(returnBooks);
      }
    });
  };
  let _readOne = (req, res) => {
    if (!req.params.bookId) {
      res.status(400);
      res.send('bookId is required');
    }
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        res.status(500).send(err);
      } else if (book) {
        let returnBook = Object.assign({}, book._doc);
        returnBook.links = {};
        returnBook.links.filterByThisGenre = `${req.protocol}://${req.headers.host}`
          + '/api/books?genre='
          + book.genre.replace(' ', '%20');
        res.json(returnBook);
      } else {
        res.status(404).send('no book found');
      }
    });
  };
  let _updateOne = (req, res) => {
    _readOne(req, res);
    if (req.body.title) {
      req.book.title = req.body.title;
    }
    if (req.body.author) {
      req.book.author = req.body.author;
    }
    if (req.body.genre) {
      req.book.genre = req.body.genre;
    }
    if (req.body.read) {
      req.book.read = req.body.read;
    }
    req.book.save((err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(req.book);
      }
    });
  };
  let _deleteOne = (req, res) => {
    _readOne(req, res);
    req.book.remove((err) => {
      if (err) {
        res.status(500);
        res.send(err);
      } else {
        res.status(204);
        res.send('Removed');
      }
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
