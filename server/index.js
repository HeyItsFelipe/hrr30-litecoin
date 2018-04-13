const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const bcrypt = require('bcrypt-nodejs');
const auth = require('./helpers.js');
const session = require('express-session');

/*
exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10,
  'Content-Type': 'text/html'
};
*/

app.use(bodyParser.json());

//Initializes session module
app.use(session({
  secret: 'mississippi candle',
  resave: true,
  saveUninitialized: false,
}));

app.use(express.static(__dirname + '/../client/dist'));

//A user's homepage
app.get('/homepage', restrict, function(req, res){
  res.send('This is the home page!');
});

//When a user signs up
app.get('/login', function(req, res){
  auth.checkCredentials(req.body, req, res)
});

app.get('/signup', (req, res) => {
  console.log('we are in GET method for /signup in server');
  console.log(req.body);
  // res.header(exports.headers);
  // res.sendFile()
  // res.redirect(''); // /signup creates a loop, so don't use
});

app.post('/signup', function(req, res){
  auth.saveCredentials(req.body);
  //After user submits sign up form, user is redirected
  //to calendar.  At the time of this comment, /calendar has
  //not been created yet.
  res.redirect('/calendar');
});

//When a user logs in
app.post('/login', function(req, res){
  auth.checkCredentials(req.body, req, res);
});


function restrict(req, res, next){
  console.log(req.session);
  if(req.session.user){
    next()
  } else {
    req.session.error = 'Access denied!';
    console.log('Restricted');
    res.status(404).end();
  }
}

module.exports = app;