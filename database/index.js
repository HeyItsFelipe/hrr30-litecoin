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
}

module.exports.saveUser = saveUser;
module.exports.findUserHash = findUserHash;