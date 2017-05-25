/*
Database connection file
 */
var Sequelize = require('sequelize');
var config = require('../config/config.js');
/*
* test : In-memory database
* dev : SQLite database
* production : PostgreSQL database (Heroku only)
*/
var sequelize = new Sequelize(config.database.test);

var User = sequelize.import ('./models/User.js');
var Car = sequelize.import ('./models/Car.js');
var LocationPoint = sequelize.import ('./models/LocationPoint.js');
var SensorData = sequelize.import ('./models/SensorData.js');
var Logging = sequelize.import ('./models/Logging.js');

//Car has a user
Car.belongsTo(User);
//Car has SensorData (One to Many)
SensorData.belongsTo(Car);
//Car has LocationPoints (One To Many)
LocationPoint.belongsTo(Car);
//Car has Loggings
Logging.belongsTo(Car);

module.exports.Sequelize = Sequelize;
module.exports.sequelize = sequelize;
module.exports.User = User;
module.exports.Car = Car;
module.exports.LocationPoint = LocationPoint;
module.exports.SensorData = SensorData;
module.exports.Logging = Logging;
