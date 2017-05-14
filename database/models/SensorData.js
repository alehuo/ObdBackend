module.exports = function(sequelize, DataTypes) {
  return sequelize.define("SensorData", {
    Sensor: DataTypes.STRING,
    Value: DataTypes.STRING,
    Timestamp: DataTypes.DATE
  })
}
