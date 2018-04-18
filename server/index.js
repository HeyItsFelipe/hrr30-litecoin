const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const bcrypt = require('bcrypt-nodejs');
const auth = require('./helpers.js');
const session = require('express-session');
const db = require('../database/index.js');

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
app.get('/calendar', restrict, function(req, res){
  res.send(JSON.stringify('This is the home page!'));
});

//When a user signs up
app.get('/signin', function(req, res){
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
  auth.saveCredentials(req.body, function(){
    req.session.regenerate(function(){
      req.session.user = req.body.username;
      res.redirect('/calendar');
    });
  });
  //After user submits sign up form, user is redirected
  //to calendar.  At the time of this comment, /calendar has
  //not been created yet.
});

//When a user logs in
app.post('/signin', function(req, res){
  auth.checkCredentials(req.body, req, res);
});

app.get('/events', function(req, res) {
  // console.log('req.body in server\'s app.get is: ', req.params);
  console.log('req in server\'s app.get: ', req.query);
  db.findUserEvents(req.query.username, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      console.log(`Events found for ${req.query.username}`);
      res.json(data);
    }
  });
});

app.post('/events', function(req, res) {

  console.log('req.body in server\'s app.post: ', req.body);
  db.addUserEvent(req.body, () => {
    // if (err) {
    //   res.sendStatus(500);
    // } else {
      // res.json(data);
      res.status(200).send(`Event saved for ${req.body}!`);
    // }
  });
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