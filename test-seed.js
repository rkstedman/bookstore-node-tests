
module.exports = function(config, callback) {
  var path = require('path'),
      _ = require('underscore');

  var booksToAdd = [];

  booksToAdd.push({
    title: 'Eloquent Javascript',
    author: 'Marijn Haverbeke',
    description: 'Eloquent JavaScript is a book providing an introduction to the JavaScript programming language and programming in general.',
    isbn: '1593272820'
  });

  booksToAdd.push({
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    description: 'Covers the bits of Javascript that are worth using, and how to use them, as well as the bits that should be avoided.',
    isbn: '0596517742'
  });


  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect(config.database.uri, function(err, db) {
    if(err) {
      console.log("Error connecting to database: " + err.toString().replace("Error: ",""));

    } else {
      console.log("Connected to DB " + config.database.uri);

      db.collection('books').drop( function() {
        console.log('Dropped books collection');
        db.collection('books').insert(booksToAdd, function(error, books) {
          if(error) {
            console.log('Error seeding database with books');
          } else {
            console.log(books.length+' new books added to database: ' + _.pluck(books, 'title').join(', '));
          }
          db.close();
          callback(booksToAdd);
        });
      });
    }
  }); 
}


