const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const bcrypt = require('bcrypt-nodejs');
const auth = require('./helpers.js');
const session = require('express-session');
const db = require('../database/index.js');

//Initializes json bodyparser
app.use(bodyParser.json());

//Initializes session module
app.use(session({
  secret: 'mississippi candle',
  resave: true,
  saveUninitialized: false,
}));

app.use(express.static(__dirname + '/../client/dist'));

//Used to restrict access to /calender
app.get('/calendar', restrict, function(req, res){
  res.send(JSON.stringify('This is the home page!'));
});


//Accepts users credentials for sign-up
app.post('/signup', function(req, res){
  auth.saveCredentials(req.body, function(){
    req.session.regenerate(function(){
      req.session.user = req.body.username;
      res.redirect('/calendar');
    });
  });
});

//Accepts user's credneials for authentication
app.post('/signin', function(req, res){
  auth.checkCredentials(req.body, req, res);
});

//Returns user event data
app.get('/events', function(req, res) {
  db.findUserEvents(req.query.username, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

//Adds an event to the database
app.post('/events', function(req, res) {
  db.addUserEvent(req.body, () => {
    res.status(200).send(`Event saved for ${req.body}!`);
  });
});

//Deletes an event to the database
app.delete('/deleteEvent', function(req, res) {
  db.deleteEvent(req.body.eventID, (err, data) => {
    if(err) {
      console.log(err);
    }
    console.log('/deleteEvent success!!!');
  });
});


//Used as middleware to restrict access to /calendar content
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