/*
Database tables are created here
 */
module.exports = function(sequelize) {
    var User = sequelize.import ('./models/User.js');
    User.sync({force: true}).then(function() {
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
}
