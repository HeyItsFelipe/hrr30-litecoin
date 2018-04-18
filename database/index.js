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
var ObjectId = mongoose.Schema.Types.ObjectId;
var eventSchema = mongoose.Schema({
  id: ObjectId,
  title: String,
  allDay: Boolean,
  start: Date,
  end: Date,
  desc: String,
  username: String
})

var Event = mongoose.model('Event', eventSchema);

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

const findUserHash = (username, callback) => {
  User.find({username: username}, 'username password', function(err, user){
    callback(user[0].password);
  });
};

const findUserEvents = (username, callback) => {
  Event.find({username: username}, (err, userEvents) => {
    callback(err, userEvents);
  });
};

const addUserEvent = (event, callback) => {
  // console.log(event.ObjectId);

  let userEvent = new Event({
    id: event.ObjectId, // not sure what id should be?; event.ObjectId is undefined
    title: event.title,
    allDay: event.allDay,
    start: event.start,
    end: event.end,
    desc: event.desc,
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

module.exports.saveUser = saveUser;
module.exports.findUserHash = findUserHash;
module.exports.findUserEvents = findUserEvents;
module.exports.addUserEvent = addUserEvent;