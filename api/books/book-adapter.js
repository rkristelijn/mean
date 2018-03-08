let bookAdapter = (Book) => {
  let _isValidObjectId = (id) => {
    return id.match(/^[0-9a-fA-F]{24}$/);
  };
  let _create = (book, bookAdapterErr, bookAdapterSuccess) => {
    if (!book.title) {
      bookAdapterErr('Title is required');
      return;
    }
    let _book = new Book(book);
    _book.save((err, bookResult) => {
      if (err) {
        bookAdapterErr('Cannot create book: ' + err);
        return;
      }
      bookAdapterSuccess(bookResult);
    });
  };
  let _read = (book, bookAdapterErr, bookAdapterSuccess) => {
    let id = book.id;
    if (!id) {
      bookAdapterErr('bookId is required');
      return;
    }
    if (!_isValidObjectId(id)) {
      bookAdapterErr('Cast to ObjectId failed for value: ' + book.id);
      return;
    }
    Book.findById(book.id, (err, bookResult) => {
      if (err) {
        bookAdapterErr('Cannot find book: ' + err);
        return;
      }
      bookAdapterSuccess(bookResult);
    });
  };
  let _update = (book, bookAdapterErr, bookAdapterSuccess) => {
    if (!_isValidObjectId(book.id)) {
      bookAdapterErr('Cast to ObjectId failed for value: ' + book.id);
      return;
    }
    _read(book, err => {
      bookAdapterErr(err);
      return;
    }, (_book) => {
      for (let member in book) {
        if (member !== 'id') {
          _book[member] = book[member];
        }
      }
      _book.save((err, bookResult) => {
        if (err) {
          bookAdapterErr('Cannot save book: ' + err);
          return;
        }
        bookAdapterSuccess(bookResult);
      });
    });
  };
  let _delete = (book, bookAdapterErr, bookAdapterSuccess) => {
    if (!_isValidObjectId(book.id)) {
      bookAdapterErr('Cast to ObjectId failed for value: ' + book.id);
      return;
    }

    Book.findById(book.id, (findErr, bookResult) => {
      if (!bookResult) {
        bookAdapterErr('Cannot find book: ' + book.id);
        return;
      }

      bookResult.remove((err) => {
        if (err) {
          bookAdapterErr('Cannot remove book: ' + err);
          return;
        }
        bookAdapterSuccess(book);
      });
    });

    // Book.remove({ _id: book.id }, (err) => {
    //   if (err) {
    //     console.log('we are in error');
    //     bookAdapterErr('Cannot remove book: ' + err);
    //     return;
    //   }
    //   bookAdapterSuccess(book);
    // });
  };
  let _query = (query, bookAdapterErr, bookAdapterSuccess) => {
    Book.find(query, (err, books) => {
      if (err) {
        bookAdapterErr('Cannot find book: ' + err);
        return;
      }
      bookAdapterSuccess(books);
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
module.exports = bookAdapter;
