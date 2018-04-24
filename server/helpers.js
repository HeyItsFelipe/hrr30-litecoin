const bcrypt = require('bcrypt-nodejs');
const session = require('express-session');
const express = require('express');
const db = require('../database/index.js');


//Hashes users password and saves username and password to database
const saveCredentials = function(obj, cb){

  var password = obj.password;

  var salt = bcrypt.genSaltSync(10);

  bcrypt.hash(password, salt, null, function(err, hash){
    if(err){
      console.log('You received this err: ', err)
    } else {
    //Save username and passsword
    obj.password = hash;
    db.saveUser(obj, function(){
      console.log('User saved!');
      cb();
      });
    }
  });
}


//Finds users hashed password and compares it with bcrypt resulting in a redirect to users calender or signin page
const checkCredentials = function(obj, req, res){
  var username = obj.username;
  var password = obj.password;
  db.findUserHash(username, function(hash){
    bcrypt.compare(password, hash, function(err, match){
      if (match){
        req.session.regenerate(function(){
          req.session.user = username;
          res.redirect('/calendar');
        });
      } else {
        res.redirect('/signin')
      }
    });
  });
}


module.exports.saveCredentials = saveCredentials;
module.exports.checkCredentials = checkCredentials;
