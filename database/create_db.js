/*
Database tables are created here
 */
var db = require('./db.js');
module.exports = function() {
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
            GpsLon: 60.199172,
            GpsLat: 24.986826,
            CarId: 1,
            Timestamp: '2017-05-14 15:36:00'
          }, {
            GpsLon: 60.199172,
            GpsLat: 24.996826,
            CarId: 1,
            Timestamp: '2017-05-14 15:39:00'
          }, {
            GpsLon: 60.299172,
            GpsLat: 24.986826,
            CarId: 2,
            Timestamp: '2017-05-14 15:41:00'
          }
        ]);
      }).then(function() {
        db.SensorData.sync({force: true}).then(function() {
          db.SensorData.bulkCreate([
            {
              CarId: 1,
              Sensor: 'RPM',
              Value: '1000',
              Timestamp: '2017-05-14 15:36:00'
            }, {
              CarId: 1,
              Sensor: 'RPM',
              Value: '1500',
              Timestamp: '2017-05-14 15:41:00'
            }
          ]);
        });
      });
    });
  });

}
