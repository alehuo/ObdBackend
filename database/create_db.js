/*
Database tables are created here
 */
module.exports = function(User) {
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
