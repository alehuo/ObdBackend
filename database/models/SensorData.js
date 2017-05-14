module.exports = function(sequelize, DataTypes) {
  return sequelize.define("SensorData", {
    Car: DataTypes.INTEGER,
    Sensor: DataTypes.STRING,
    Value: DataTypes.STRING,
    Timestamp: DataTypes.DATE
  })
}
