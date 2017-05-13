module.exports = function() {

  //Express
  var express = require('express');
  //Router
  var router = express();
  //User authentication
  var userAuthentication = require('../auth/userAuth.js');
  //JSON Web Tokens
  var jwt = require('jwt-simple');
  //Moment
  var moment = require('moment');
  //Config
  var config = require('../config/config.js');
  //Sequelize
  var db = require('../database/db.js');

  //List all users
  router.get('/users', userAuthentication(db.User), function(req, res) {
    db.User.findAll().then(function(users) {
      res.json(users)
    })
  });
  //Register a new user
  router.post('/users', function(req, res) {
    db.User.sync().then(function() {
      db.User.find({
        where: {
          username: req.body.username
        }
      }).then(function(user) {
        if (!user) {
          if (req.body.username && req.body.password) {
            db.User.create({username: req.body.username, password: req.body.password}).then(function(user) {
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
  router.post('/authentication', function(req, res) {
    db.User.findOne({
      where: {
        username: req.body.username,
        password: req.body.password
      }
    }).then(function(user) {
      if (user) {
        //Set expire
        var expires = moment().add(config.token.expire_value, config.token.expire_type).valueOf();
        //Create token
        var token = jwt.encode({
          iss: user.id,
          exp: expires,
          user: user.toJSON()
        }, config.token.secret_key);
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

  /* ------------- Car ------------ */

  // Return cars display name
  // Accepts vin
  router.post('/car', function(req, res) {
    db.Car.findOne({
      where: {
        Vin: req.body.vin
      }
    }).then(function(car){
      if(car){
        res.status(200);
        res.json({success: true, message: 'Car found', car});
      } else {
        res.status(400);
        res.json({success: false, message: 'Could not find the car'});
      }
    }, function(err) {
      res.status(400);
      res.json({success: false, message: 'Error'});
    })
  });

  /* ------------- Location ------------ */

  // This function will return all LocationPoints for car
  // Accepts Car
  router.post('/location', function(req, res) {
    db.LocationPoint.findAll({
      where: {
        Car: req.body.car
      }
    }).then(function(LocationPoints){
      console.log(LocationPoints)
      if(LocationPoints){
        res.status(200);
        res.json({success: true, message: 'Location history found', LocationPoints});
      } else {
        res.status(400);
        res.json({success: false, message: 'Could not find the location history'});
      }
    }, function(err) {
      res.status(400);
      res.json({success: false, message: 'Error'});
    })
  });


  return router;
}
