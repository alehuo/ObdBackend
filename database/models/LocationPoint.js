module.exports = function(sequelize, DataTypes) {
  return sequelize.define("LocationPoint", {
    GpsLon: DataTypes.DOUBLE,
    GpsLat: DataTypes.DOUBLE,
    Car: DataTypes.INTEGER,
    Timestamp: DataTypes.DATE
  })
}
