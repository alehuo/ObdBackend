module.exports = function(sequelize, DataTypes) {
  return sequelize.define("LocationPoint", {
    GpsLon: DataTypes.DOUBLE,
    GpsLat: DataTypes.DOUBLE,
    Timestamp: DataTypes.DATE
  })
}
