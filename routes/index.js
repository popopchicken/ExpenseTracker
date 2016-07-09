var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Hello!' });
  var db = req.db;
  db.get('expenses').find({}, {}, function(err,data) {
    res.render('index', {
      "expenses" : data
      })
  });
});

/* Get Users */
router.get('/users', function(req, res) {
  var db = req.db;
  db.get('users').find({}, {}, function(e,data) {
    res.render('users', {
        "users" : data
    })
  })
})

/* Add expense */
router.post('/addExpense', function(req,res) {
  var db = req.db;
  var item = req.body.item;
  var cost = req.body.cost;
  var query = { 'name': item, 'cost': cost }
  db.get('expenses').insert(query, function(err, data) {
      if(err) {
        res.send('Cannot add expense')
      } else {
        res.redirect('/');
      }
  })
})


/* Add Users */
router.post('/addUser', function(req,res) {
  //Set db variable
  var db = req.db;
  // Get form values from name attributes
  var userName = req.body.username;
  var email = req.body.email;
  // Submit to db
  var query = { "username": userName, "email":  email };
  db.get('users').insert(query, function(err, data) {
    if (err) {
      res.send('Cannot add user to db');
    } else {
      res.redirect('/users');
    }
  });
});

module.exports = router;
