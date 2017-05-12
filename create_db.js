module.exports = function(sequelize) {
  var User = sequelize.import ('./models/User.js');
  sequelize.sync({force: true}).then(function() {
    User.destroy({truncate: true}).then(function(cb) {
      User.bulkCreate([
        {
          username: 'admin',
          password: 'admin'
        }, {
          username: 'user',
          password: 'user'
        }
      ]);
    });

  });
}
