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

//List all users
app.get('/api/users', userAuthentication(User), function(req, res) {
  User.findAll().then(function(users) {
    res.json(users)
  })
});
//Register a new user
app.post('/api/users', function(req, res) {
  sequelize.sync().then(function() {
    User.find({
      where: {
        username: req.body.username
      }
    }).then(function(user) {
      if (!user) {
        if (req.body.username && req.body.password) {
          User.create({username: req.body.username, password: req.body.password}).then(function(user) {
            res.status(201);
            res.json({success: true, message: 'User created', user: user});
          });
        } else {
          res.status(400);
          res.json({success: false, message: 'Missing parameters'});
        }
      } else {
        res.status(400);
        res.json({success: false, message: 'User already exists'});
      }
    });

  });
});
//Authentication of a user
app.post('/api/authentication', function(req, res) {
  User.findOne({
    where: {
      username: req.body.username,
      password: req.body.password
    }
  }).then(function(user) {
    if (user) {
      //Expire within a week
      var expires = moment().add(7, 'days').valueOf();
      //Create token
      var token = jwt.encode({
        iss: user.id,
        exp: expires,
        user: user.toJSON()
      }, config.secret_key);
      res.status(200);
      res.json({success: true, message: 'Authentication successful', token: token, expires: expires});
    } else {
      res.status(400);
      res.json({success: false, message: 'Invalid username or password'});
    }
  }, function(err) {
    res.status(400);
    res.json({success: false, message: 'Error'});
  });
});

//Start Exoress
app.listen(port, function(err) {
  console.log('Listening on port', port);
});
