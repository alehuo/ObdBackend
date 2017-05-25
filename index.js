/*
Back-end for OBD app
 */
//Express
var express = require('express');
var app = express();
//Body parser
var bodyParser = require('body-parser');
//Database creation script
var create_db = require('./database/create_db.js');
//API routes
var apiRoutes = require('./routes/apiRoutes.js');

//Server port
var port = process.env.PORT || 8080;

//Use Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Create database tables
create_db();

//Default route
app.get('/', function(req, res) {
  res.send('Hello world! Visit the API at /api');
});

app.use('/api', apiRoutes());

//Start Express
app.listen(port, function(err) {
  console.log('Listening on port', port);
});

module.exports = app;