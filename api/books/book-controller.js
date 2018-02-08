let bookController = function (Book) {
  let post = function (req, res) {
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
  let get = function (req, res) {
    let query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    Book.find(query, function (err, books) {
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

  let getOne = function (req, res) {
    if(!req.params.bookId) {
      res.status(400);
      res.send('bookId is required');
    }
    Book.findById(req.params.bookId, function (err, book) {
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

  return {
    getOne: getOne,
    post: post,
    get: get
  };
};
module.exports = bookController;
