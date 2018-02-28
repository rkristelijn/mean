let bookAdapter = (Book) => {
  let _create = (book, done) => {
    let _book = new Book(book);
    _book.save((err, book) => {
      if (err) {
        console.log('bookAdapter._save: ERROR:', err);
        done(err);
      }
      console.log('bookAdapter._save: SUCCESS:', book);
      done(book);
    });
  };
  let _read = (book, done) => {
    console.log('bookAdapter._read: reading book:', book);
    Book.findById(book.id, (err, book) => {
      if (err) {
        console.log('bookAdapter._read: ERROR:', err);
        done(err);
      }
      console.log('bookAdapter._read: SUCCESS:', book);
      done(book);
    });
  };
  let _update = (book, done) => {
    console.log('bookAdapter._update: updating book:', book);
    _read(book, (_book) => {
      for (let member in book) {
        //if (!_book.hasOwnProperty(member) || typeof(_book[member]) === "function") continue;
        console.log('bookAdapter._update: element in book:', member);
        if (member !== 'id') {
          _book[member] = book[member];
        }
      }

      _book.save((err, book) => {
        if (err) {
          console.log('bookAdapter._update: ERROR:', err);
          done(err);
        }
        console.log('bookAdapter._update: SUCCESS:', book);
        done(book);
      });
    });
  };
  let _delete = (book, done) => {
    Book.remove({_id: book.id}, (err) => {
      if (err) {
        console.log('bookAdapter._delete: ERROR:', err);
        done(err);
      }
      console.log('bookAdapter._delete: SUCCESS:', book);
      done(book);
    });
  };
  let _query = (query, done) => {
    console.log('bookAdapter._query: finding books:', query);
    Book.find(query, (err, books) => {
      if (err) {
        console.log('bookAdapter._query: ERROR: ', err);
        done(err);
      }
      //console.log('bookAdapter: SUCCESS: ', books);
      done(books);
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
