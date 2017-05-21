module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Logging", {
    loggingStart: DataTypes.STRING,
    loggingStop: DataTypes.STRING

  })
}
