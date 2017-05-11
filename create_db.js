var Sequelize = require('sequelize');
module.exports = function(sequelize, User) {

  sequelize.sync().then(function() {
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
