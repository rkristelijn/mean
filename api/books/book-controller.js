let bookController = (Book) => {
  let _create = (req, res) => {
    let book = new Book(req.body);
    if (!req.body.title) {
      res.status(400);
      res.send('Title is required');
    } else {
      book.save();
      res.status(201);
      res.send(book);
    }
  };
  let _readAll = (req, res) => {
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
        book.links = {};
        book.ook.links.filterByThisGenre = 'http://'
          + req.headers.host + '/api/books/?genre='
          + book.genre.replace(' ', '%20');
        res.json(book);
      } else {
        res.status(404).send('no book found');
      }
    });
  };
  let _update = (req, res) => {
    this._readOne(req);
    req.book.title = req.body.title;
    req.book.author = req.body.author;
    req.book.genre = req.body.genre;
    req.book.read = req.body.read;
    req.book.save((err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(req.book);
      }
    });
  };
  return {
    create: _create,
    readOne: _readOne,
    readAll: _readAll,
    update: _update
  };
};
module.exports = bookController;
