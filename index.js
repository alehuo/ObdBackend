/*
Back-end for OBD app
 */
//Express
var express = require('express');
var app = express();
//Sequelize
var Sequelize = require('sequelize');
//Body parser
var bodyParser = require('body-parser');
//JSON Web Tokens
var jwt = require('jwt-simple');
//Moment
var moment = require('moment');
//Database creation script
var create_db = require('./database/create_db.js');
//Config
var config = require('./config/config.js');
//API routes
var apiRoutes = require('./routes/api_routes.js');

//Server port
var port = process.env.PORT || 8080;

//Use Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Database connectivity
var sequelize = new Sequelize('sqlite:///database.sqlite');

//Create database tables
create_db(sequelize);

//Default route
app.get('/', function(req, res) {
    res.send('Hello world! Visit the API at /api');
});

app.use('/api', apiRoutes());

//Start Express
app.listen(port, function(err) {
    console.log('Listening on port', port);
});
