let bookAdapter = (Book) => {
  let _create = (book, bookAdapterErr, bookAdapterSuccess) => {
    if (!book.title) {
      bookAdapterErr('bookAdapter._save: ERROR: Title is required');
      return;
    }
    let _book = new Book(book);
    _book.save((err, book) => {
      if (err) {
        bookAdapterErr('bookAdapter._save: ERROR:' + err);
        return;
      }
      //console.log('bookAdapter._save: SUCCESS:', book);
      bookAdapterSuccess(book);
    });
  };
  let _read = (book, bookAdapterErr, bookAdapterSuccess) => {
    //console.log('bookAdapter._read: reading book:', book);
    let id = book.id;
    if (!id) {
      bookAdapterErr('bookAdapter._read: ERROR: book.id is required');
      return;
    }
    if (!_isValidObjectId(id)) {
      bookAdapterErr('bookAdapter._read: ERROR: Cast to ObjectId failed for value: ' + book.id);
      return;
    }
    Book.findById(book.id, (err, book) => {
      if (err) {
        bookAdapterErr('bookAdapter._read: ERROR:' + err);
        return;
      }
      //console.log('bookAdapter._read: SUCCESS:', book);
      if (!book) {
        bookAdapterErr('bookAdapter._read: ERROR: book not found:' + id);
        return;
      }
      bookAdapterSuccess(book);
    });
  };
  let _update = (book, bookAdapterErr, bookAdapterSuccess) => {
    if (!_isValidObjectId(book.id)) {
      bookAdapterErr('bookAdapter._update: ERROR: Cast to ObjectId failed for value: ' + book.id);
      return;
    }
    //console.log('bookAdapter._update: updating book:', book);
    _read(book, err => {
      bookAdapterErr('bookAdapter._update: ERROR:' + err);
      return;
    }, (_book) => {
      for (let member in book) {
        //console.log('bookAdapter._update: element in book:', member);
        if (member !== 'id') {
          _book[member] = book[member];
        }
      }
      _book.save((err, book) => {
        if (err) {
          bookAdapterErr('bookAdapter._update: ERROR:' + err);
          return;
        }
        //console.log('bookAdapter._update: SUCCESS:', book);
        bookAdapterSuccess(book);
      });
    });
  };
  let _delete = (book, bookAdapterErr, bookAdapterSuccess) => {
    if (!_isValidObjectId(book.id)) {
      bookAdapterErr('bookAdapter._delete: ERROR: Cast to ObjectId failed for value: ' + book.id);
      return;
    }
    Book.remove({ _id: book.id }, (err) => {
      if (err) {
        bookAdapterErr('bookAdapter._delete: ERROR:' + err);
        return;
      }
      //console.log('bookAdapter._delete: SUCCESS:', book);
      bookAdapterSuccess(book);
    });
  };
  let _query = (query, bookAdapterErr, bookAdapterSuccess) => {
    //console.log('bookAdapter._query: finding books:', query);
    Book.find(query, (err, books) => {
      if (err) {
        bookAdapterErr('bookAdapter._query: ERROR: ' + err);
        return;
      }
      bookAdapterSuccess(books);
    });
  };
  let _isValidObjectId = (id) => {
    return (id.match(/^[0-9a-fA-F]{24}$/));
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
