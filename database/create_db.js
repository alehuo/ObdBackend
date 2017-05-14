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
  });
  db.Car.sync({force: true}).then(function() {
      db.Car.bulkCreate([
        {
          Vin: '123',
          DisplayName: 'Toyoda'
        }, {
          Vin: '000',
          DisplayName: 'Furrari'
        }
      ]);
    });
    db.LocationPoint.sync({force: true}).then(function() {
        db.LocationPoint.bulkCreate([
          {
            GpsLon: 60.199172,
            GpsLat: 24.986826,
            Car: 1,
            Timestamp: 1494694203
          }, {
            GpsLon: 60.199172,
            GpsLat: 24.996826,
            Car: 1,
            Timestamp: 1494694000
          }, {
            GpsLon: 60.299172,
            GpsLat: 24.986826,
            Car: 2,
            Timestamp: 1494690000
          }
        ]);
      });
      db.SensorData.sync({force: true}).then(function() {
          db.SensorData.bulkCreate([
            {
              Car: 1,
              Sensor: 'RPM',
              Value: '1000',
              Timestamp: 1494690000
            }, {
              Car: 1,
              Sensor: 'RPM',
              Value: '1500',
              Timestamp: 1494690005
            }
          ]);
        });
}
