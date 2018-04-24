var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wydrn');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We connected!')
});


var userSchema = mongoose.Schema({
  username : {
    type: String,
    unique: true
  },
  password: String,
  email: String
});

var User = mongoose.model('User', userSchema);

//Exposes ObjectID for schema type
var ObjectId = mongoose.Types.ObjectId;

var eventSchema = mongoose.Schema({
  title: String,
  allDay: Boolean,
  start: Date,
  end: Date,
  username: String
})

var Event = mongoose.model('Event', eventSchema);

//Adds user credentials passed from POST request to server for sign-up
const saveUser = (userData, callback) => {
  console.log(userData);
  let userInfo = new User({
    username: userData.username,
    password: userData.password,
    email: userData.email
  });

  userInfo.save(err => {
    if (err) {
      console.log(err);
    } else {
      callback();
    }
  });
};

//Finds user's hashed password for POST request to server for sign-in
const findUserHash = (username, callback) => {
  console.log('Username is: ' + username);
  User.find({username: username}, 'username password', function(err, user){
    if(user.length) {
      callback(user[0].password);
    } else {
      callback('This will not match hash.');
    }
  });
};

//Given a user, returns all events from database for that user
const findUserEvents = (username, callback) => {
  Event.find({username: username}, (err, userEvents) => {
    console.log(`userEvents found in database: ${userEvents}`);
    callback(err, userEvents);
  });
};


//Adds event for user
const addUserEvent = (event, callback) => {

  let userEvent = new Event({
    id: new ObjectId,
    title: event.title,
    allDay: event.allDay,
    start: event.start,
    end: event.end,
    username: event.username
  });

  userEvent.save(err => {
    if (err) {
      console.log(err);
    } else {
      callback();
    }
  });
};

//Deletes user event for given eventID
const deleteEvent = (eventID, callback) => {
  Event.findByIdAndRemove(eventID, callback);
};

module.exports.deleteEvent = deleteEvent;
module.exports.saveUser = saveUser;
module.exports.findUserHash = findUserHash;
module.exports.findUserEvents = findUserEvents;
module.exports.addUserEvent = addUserEvent;