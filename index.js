const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const create_db = require('./create_db.js');
const config = require('./config.js');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

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

var User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

//Temporary workaround
create_db(sequelize, User);

app.get('/', function(req, res) {
  User.findAll().then(function(users) {
    res.json(users)
  })
});

app.post('/authentication', function(req, res) {
  var usrname = req.body.username;
  var passwd = req.body.password;
  console.log(usrname, passwd);
  res.send(req.body);
});

app.listen(port, function(err) {
  console.log('Listening on port', port);
});
