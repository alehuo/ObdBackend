module.exports = function(sequelize, DataTypes) {
  return sequelize.define("LocationPoint", {
    GpsLon: DataTypes.DOUBLE,
    GpsLat: DataTypes.DOUBLE,
    Accuracy: DataTypes.INTEGER,
    Speed: DataTypes.DOUBLE,
    Altitude: DataTypes.INTEGER,
    Heading: DataTypes.DOUBLE,
    Timestamp: DataTypes.DATE
  })
}
