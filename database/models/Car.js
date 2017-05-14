module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Car", {
    Vin: DataTypes.STRING,
    DisplayName: DataTypes.STRING
  })
}
