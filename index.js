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

//List all users (User authentication middleware is used here)
app.get('/api/list_users', userAuthentication(User), function(req, res) {
  User.findAll().then(function(users) {
    res.json(users)
  })
});

//Authentication of a user
app.post('/authentication', function(req, res) {
  User.findOne({
    where: {
      username: req.body.username,
      password: req.body.password
    }
  }).then(function(user) {
    var response = {
      success: false,
      message: 'Invalid username or password'
    };
    if (user) {
      //Expire within a week
      var expires = moment().add(7, 'days').valueOf();
      //Create token
      var token = jwt.encode({
        iss: user.id,
        exp: expires,
        user: user.toJSON()
      }, config.secret_key);
      //Build response
      response = {
        success: true,
        message: 'Authentication successful',
        token: token,
        expires: expires
      };
    }
    //Send to browser
    res.json(response);
  }, function(err) {
    res.send('Error');
  });
});

//Start Exoress
app.listen(port, function(err) {
  console.log('Listening on port', port);
});
