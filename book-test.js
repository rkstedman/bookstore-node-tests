// config
var serverUrl = 'http://localhost:3000';
var database = {uri: 'mongodb://localhost:27017/bookdb-test'};
var config = {database: database};

var request = require('request'),
    should = require('should');

describe('Book', function() {
  var books;
  
  before(function(done) {
    require('./test-seed')(config, function(booksAdded) {
      books = booksAdded;
      done();
    });
  })
  
  describe('#list', function() {
    it('should retrieve a list of books', function(done) {
      
      var options = {
        url: serverUrl + '/books',
        method: 'get',
        headers: { Accept: 'application/json'}
      };
      
      request(options, function(error, response) {
        should.not.exist(error);
        should.exist(response);
        // upon success, should respond with 200 (Ok)
        response.statusCode.should.equal(200);
        var books = JSON.parse(response.body);
        books.should.be.an.instanceOf(Array);
        done(); 
      });
    })
  })
  
  describe('#create', function() {
    it('should create a new book', function(done) {
      
      var options = {
        url: serverUrl + '/books',
        method: 'post',
        headers: { Accept: 'application/json'}
      };
      
      request(options, function(error, response) {
        should.not.exist(error);
        should.exist(response);
        // upon success, should respond with 201 (Created)
        response.statusCode.should.equal(201);
        done();
      });
    })
  })
  
  describe('#read', function() {
    it('should respond with book resource', function(done) {
      var bookId = books[0].isbn;
      var options = {
        url: serverUrl + '/books/' + bookId,
        method: 'get',
        headers: { Accept: 'application/json'}
      };
      
      request(options, function(error, response) {
        should.not.exist(error);
        should.exist(response);
        // upon success, a read provides a 200 (Ok)
        response.statusCode.should.equal(200);
        done();
      });
    })
  })
  
  describe('#update ', function() {
    it('should update book resource', function(done) {
      var bookId = books[0].isbn;
      var options = {
        url: serverUrl + '/books/' + bookId,
        method: 'put',
        headers: { Accept: 'application/json'}
      };
      
      request(options, function(error, response) {
        should.not.exist(error);
        should.exist(response);
        // upon success, an update provides a 204 (No Content)
        response.statusCode.should.equal(204);
        done();
      }); 
    })
  })
  
  describe('#delete ', function() {
    it('should delete the book', function(done) {
      var bookId = books[1].isbn;
      var options = {
        url: serverUrl + '/books/' + bookId,
        method: 'delete',
        headers: { Accept: 'application/json'}
      };
      
      request(options, function(error, response) {
        should.not.exist(error);
        should.exist(response);
        // upon success, a delete provides a 204 (No Content)
        response.statusCode.should.equal(204);
        done();
      });
    })
  })
  
})