module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Car", {
    vin: DataTypes.STRING,
    DisplayName: DataTypes.STRING
  })
}
