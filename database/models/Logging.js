module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Logging", {
    loggingStart: DataTypes.DATE,
    loggingStop: DataTypes.DATE
  })
}
