/*
Database tables are created here
 */
var db = require('./db.js');
module.exports = function(fn) {
  db.User.sync({force: true}).then(function() {
    db.User.bulkCreate([
      {
        username: 'admin',
        password: 'admin'
      }, {
        username: 'user',
        password: 'user'
      }
    ]);
  }).then(function() {
    db.Car.sync({force: true}).then(function() {
      db.Car.bulkCreate([
        {
          Vin: '123',
          DisplayName: 'Toyoda',
          UserId: 1
        }, {
          Vin: '000',
          DisplayName: 'Furrari',
          UserId: 1
        }
      ]);
    }).then(function() {
      db.LocationPoint.sync({force: true}).then(function() {
        db.LocationPoint.bulkCreate([
          {
            GpsLon: 24.986826,
            GpsLat: 60.199172,
            Accuracy: 8,
            CarId: 1,
            Speed: 160,
            Altitude: 57,
            Heading: 330,
            Timestamp: 1495109157000
          }, {
            GpsLon: 24.986826,
            GpsLat: 60.199172,
            Accuracy: 5,
            CarId: 1,
            Speed: 160,
            Altitude: 57,
            Heading: 330,
            Timestamp: 1495129157000
          }, {
            GpsLon: 24.986826,
            GpsLat: 60.199172,
            Accuracy: 15,
            CarId: 2,
            Speed: 160,
            Altitude: 57,
            Heading: 330,
            Timestamp: 1495129157000
          }
        ]);
      }).then(function() {
        db.SensorData.sync({force: true}).then(function() {
          db.SensorData.bulkCreate([
            {
              CarId: 1,
              Sensor: 'RPM',
              Value: '1000',
              Timestamp: 1495129157000
            }, {
              CarId: 1,
              Sensor: 'RPM',
              Value: '1500',
              Timestamp: 1495129157000
            }
          ]);
        });
      }).then(function() {
        db.Logging.sync({force: true}).then(function() {
          db.Logging.bulkCreate([
            {
              CarId: 1,
              loggingStart: 1495121157000,
              loggingEnd: 1495129157000
            }, {
              CarId: 1,
              loggingStart: 1495521157000,
              loggingEnd: 1495529157000
            }
          ]);
          fn(true)
        });
      });
    });
  });

}
