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

  var userAttribs = ['id', 'username'];

  //List all users
  router.get('/users', userAuthentication(db.User), function(req, res) {
    db.User.findAll({attributes: userAttribs}).then(function(users) {
      res.json(users)
    })
  });
  //List a single user
  router.get('/users/:id', userAuthentication(db.User), function(req, res) {
    console.log('jee1');
    db.User.find({
      attributes: userAttribs,
      where: {
        id: req.params.id
      }
    }).then(function(user) {
      res.json(user)
    })
  });
  //List current user
  router.get('/currentuser', userAuthentication(db.User), function(req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    //Decoded JWT
    var decoded = jwt.decode(token, config.token.secret_key);
    db.Car.findAll({
      where: {
        UserId: decoded.user.id
      }
    }).then(function(cars) {
      res.json({
        success: true,
        message: 'Current user fetched successfully',
        user: {
          id: decoded.user.id,
          username: decoded.user.username
        },
        cars: cars
      });
    });

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
  router.get('/car/:vin', userAuthentication(db.User), function(req, res) {
    db.Car.findOne({
      where: {
        Vin: req.params.vin
      }
    }).then(function(car) {
      if (car) {
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
  // Accepts Car id
  router.get('/location/:car', userAuthentication(db.User), function(req, res) {
    db.LocationPoint.findAll({
      where: {
        CarId: req.params.car
      }
    }).then(function(LocationPoints) {
      if (LocationPoints) {
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

  router.post('/location', userAuthentication(db.User), function(req, res) {
    db.LocationPoint.sync().then(function() {
      db.LocationPoint.create(
        {
          CarId: req.body.carId,
          Speed: req.body.speed,
          GpsLat: req.body.latitude,
          GpsLon: req.body.longitude,
          Accuracy: req.body.accuracy,
          Altitude: req.body.altitude,
          Heading: req.body.heading,
          Timestamp: req.body.ts}
        ).then(function(db) {
        console.log("Create: " + db);
        if (db) {
          res.status(200);
          res.json({success: true, message: 'Location data inserted'});
        } else {
          res.status(400);
          res.json({success: false, message: 'Could not insert locationd ata'});
        }
      }, function(err) {
        res.status(400);
        res.json({success: false, message: 'Error'});
      })
    })
  });


  /* ------------- SensorData ------------ */

  // This function will return all SensorData for car
  // Accepts Car id
  router.get('/sensordata/:car', userAuthentication(db.User), function(req, res) {
    db.SensorData.findAll({
      where: {
        CarId: req.params.car
      }
    }).then(function(SensorData) {
      console.log("SensorData: " + SensorData)
      if (SensorData) {
        res.status(200);
        res.json({success: true, message: 'Sensor history found', SensorData});
      } else {
        res.status(400);
        res.json({success: false, message: 'Could not find the sensor history'});
      }
    }, function(err) {
      res.status(400);
      res.json({success: false, message: 'Error'});
    })
  });

  router.post('/sensordata', userAuthentication(db.User), function(req, res) {
    db.SensorData.sync().then(function() {
      db.SensorData.create({CarId: req.body.Car, Sensor: req.body.Sensor, Value: req.body.Value, Timestamp: req.body.Timestamp}).then(function(db) {
        console.log("Create: " + db);
        if (db) {
          res.status(200);
          res.json({success: true, message: 'Sensor history inserted'});
        } else {
          res.status(400);
          res.json({success: false, message: 'Could not insert sensor history'});
        }
      }, function(err) {
        res.status(400);
        res.json({success: false, message: 'Error'});
      })
    })
  });

  /* ------------------ Logging --------------- */
  router.post('/logging', userAuthentication(db.User), function(req, res) {
    db.SensorData.sync().then(function() {
      db.SensorData.create({
          CarId: req.body.Car,
          loggingStart: req.body.Sensor,
          loggingEnd: req.body.Value,
        }).then(function(db) {
        if (db) {
          res.status(200);
          res.json({success: true, message: 'Log inserted'});
        } else {
          res.status(400);
          res.json({success: false, message: 'Could not insert log'});
        }
      }, function(err) {
        res.status(400);
        res.json({success: false, message: 'Error'});
      })
    })
  });

  router.get('/logging/:car', userAuthentication(db.User), function(req, res) {
    db.SensorData.findAll({
      where: {
        CarId: req.params.car
      }
    }).then(function(Logging) {
      if (Logging) {
        res.status(200);
        res.json({success: true, message: 'Log found', Logging});
      } else {
        res.status(400);
        res.json({success: false, message: 'Could not find log'});
      }
    }, function(err) {
      res.status(400);
      res.json({success: false, message: 'Error'});
    })
  });


  return router;
}
