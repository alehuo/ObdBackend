const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const config = require('./config.js');
const jwt = require('jwt-simple');
const bodyParser = require('body-parser');
const moment = require('moment');
const userAuthentication = require('./userAuth.js');
const create_db = require('./create_db.js');

var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('KEY', config.secret_key);

//Database connectivity
var sequelize = new Sequelize('', '', '', {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  storage: 'database.sqlite'
});

var User = sequelize.import ('./models/User.js');


//Temporary workaround
create_db(sequelize);

app.get('/', function(req, res) {
  res.send('Hello world!');
});

//List all users
app.get('/api/list_users', [userAuthentication], function(req, res) {
  User.findAll().then(function(users) {
    res.json(users)
  })
});

//Authentication test
app.post('/authentication', function(req, res) {
  var usrname = req.body.username;
  User.findOne({
    where: {
      username: usrname
    }
  }).then(function(user) {
    var response = {
      error: 'Invalid username or password'
    };
    if (user) {
      //Expire within a week
      var expires = moment().add('days', 7).valueOf();
      //Create token
      var token = jwt.encode({
        iss: user.id,
        exp: expires
      }, app.get('KEY'));
      //Build response
      response = {
        token: token,
        expires: expires,
        user: user.toJSON(),
        error: false
      };
    }

    //Log to console
    console.log(response);
    //Send to browser
    res.json(response);
  }, function(err) {
    res.send('Error');
  });
});

app.listen(port, function(err) {
  console.log('Listening on port', port);
});
