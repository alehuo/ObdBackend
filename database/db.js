/*
Database connection file
 */
var Sequelize = require('sequelize');
var config = require('../config/config.js');
var sequelize = new Sequelize(config.database.test);

var User = sequelize.import('./models/User.js');

module.exports.Sequelize = Sequelize;
module.exports.sequelize = sequelize;
module.exports.User = User;
