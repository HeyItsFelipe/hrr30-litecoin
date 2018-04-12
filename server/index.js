const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const bcrypt = require('bcrypt');
const auth = require('./helpers.js');
const session = require('express-session');

app.use(bodyParser.json());

//Initializes session module
app.use(session({
  secret: 'mississippi candle',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));



//Accepts a POST request for /login
/*app.post('/login', function(req, res){
  //Should receive username and password
  var username = req.body
  var password = req.body
  //If username and password are found and match
    //Render their home page
    res.redirect('/homepage');
  //If username is found but password does not match
    //Render a message that says username or password are incorrect
    res.redirect('/login/error');
  //If username is not found
    //Render a message that says try again or sign up
    res.redirect('/signup');
});*/

app.get('/homepage', auth.restrict, function(req, res){
  res.send('This is the home page!');
});

app.get('/login', function(req, res){
  auth.checkCredentials(req.body, req, res)
})

app.post('/signup', function(req, res){
  auth.saveCredentials(req.body);
  res.redirect('/login');
});

app.listen(3000, () => {
  console.log('Now listening on port 3000!')
});

