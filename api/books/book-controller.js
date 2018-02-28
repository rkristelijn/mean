const Book = require('./book-model');
let bookAdapter = require('./book-adapter')(Book);

let bookController = (Book) => {
  let _create = (req, res) => {
    //let book = new Book(req.body);
    if (!req.body.title) {
      res.status(400);
      res.send('Title is required');
    } else {
      bookAdapter.create(req.body, (book) => {
        res.status(201);
        res.json(book);
      });
      //book.save();
      // let returnBook = Object.assign({}, book._doc);
      // returnBook.links = {};
      // returnBook.links.filterByThisGenre = `${req.protocol}://${req.headers.host}`
      //   + '/api/books?genre='
      //   + book.genre.replace(' ', '%20');
      //res.status(201);
      // res.json(returnBook);
      //res.json(book);
    }
  };
  let _readAll = (req, res) => {
    bookAdapter.query({}, (books) => {
      //console.log("_readAll:", books);
      res.json(books);
    });
    // let query = {};
    // if (req.query.genre) {
    //   query.genre = req.query.genre;
    // }
    // Book.find(query, (err, books) => {
    //   if (err) {
    //     res.status(500).send(err);
    //   } else {
    //     // let returnBooks = [];
    //     // books.forEach(element => {
    //     //   let newBook = element.toJSON();
    //     //   newBook.links = {};
    //     //   newBook.links.self = 'http://'
    //     //     + req.headers.host + '/api/books/' + newBook._id;
    //     //   returnBooks.push(newBook);
    //     // });
    //     // res.json(returnBooks);
    //     res.json(books);
    //   }
    // });
  };
  let _readOne = (req, res) => {
    if (!req.params.bookId) {
      res.status(400);
      res.send('bookId is required');
    } else if (!_isObjectId(req.params.bookId)) {
      res.status(400);
      res.send(`Cast to ObjectId failed for value ${req.params.bookId}`);
    } else {
      bookAdapter.read({ id: req.params.bookId }, (book) => {
        res.json(book);
      });
      // Book.findById(req.params.bookId, (err, book) => {
      //   if (err) {
      //     res.status(500).send(err);
      //   } else if (book) {
      //     // let returnBook = Object.assign({}, book._doc);
      //     // returnBook.links = {};
      //     // returnBook.links.filterByThisGenre = `${req.protocol}://${req.headers.host}`
      //     //   + '/api/books?genre='
      //     //   + book.genre.replace(' ', '%20');
      //     // req.book = returnBook;
      //     // res.json(returnBook);
      //     res.json(books);
      //   } else {
      //     res.status(404).send('no book found');
      //   }
      //});
    }
  };
  let _updateOne = (req, res) => {
    if (!req.params.bookId) {
      res.status(400);
      res.send('bookId is required');
    } else if (!_isObjectId(req.params.bookId)) {
      res.status(400);
      res.send(`Cast to ObjectId failed for value ${req.params.bookId}`);
    } else {
      req.body.id = req.params.bookId;
      bookAdapter.update(req.body, (book) => {
        res.json(book);
      });
      // Book.findById(req.params.bookId, (err, book) => {
      //   if (err) {
      //     res.status(500).send(err);
      //   } else if (book) {
      //     console.log('found book:', book);
      //     if (req.body.title) {
      //       req.book.title = req.body.title;
      //     }
      //     if (req.body.author) {
      //       req.book.author = req.body.author;
      //     }
      //     if (req.body.genre) {
      //       req.book.genre = req.body.genre;
      //     }
      //     if (req.body.read) {
      //       req.book.read = req.body.read;
      //     }
      //     console.log('saving...', req.book);
      //     req.book.save((err) => {
      //       if (err) {
      //         res.status(500).send(err);
      //       } else {
      //         res.json(req.book);
      //       }
      //     });
      //   }
      // });
    }
  };

  let _deleteOne = (req, res) => {
    bookAdapter.delete({ id: req.params.bookId }, (book) => {
      res.status(204).send(`Removed ${book}`);
    });
  };

  // let _queryOne = (id) => {
  //   console.log('_queryOne', 'finding book', id);
  //   Book.findById(id, (err, book) => {
  //     if (err) {
  //       console.log('_queryOne', 'cannot find book', err);
  //       //res.status(500).send(err);
  //       return false;
  //     } else if (book) {
  //       console.log('found:', book);
  //       return book;
  //       //console.log(`found book:`, book);
  //       // let returnBook = Object.assign({}, book._doc);
  //       // returnBook.links = {};
  //       // returnBook.links.filterByThisGenre = `${req.protocol}://${req.headers.host}`
  //       //   + '/api/books?genre='
  //       //   + book.genre.replace(' ', '%20');
  //       // req.book = returnBook;
  //       // res.json(returnBook);
  //     } else {
  //       return false;
  //     }
  //   });
  // };

  let _isObjectId = (id) => {
    return (id.match(/^[0-9a-fA-F]{24}$/));
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
