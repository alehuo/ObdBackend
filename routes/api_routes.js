module.exports = function(app, User, jwt, moment, config, userAuthentication) {

    //List all users
    app.get('/api/users', userAuthentication(User), function(req, res) {
        User.findAll().then(function(users) {
            res.json(users)
        })
    });
    //Register a new user
    app.post('/api/users', function(req, res) {
        User.sync().then(function() {
            User.find({
                where: {
                    username: req.body.username
                }
            }).then(function(user) {
                if (!user) {
                    if (req.body.username && req.body.password) {
                        User.create({username: req.body.username, password: req.body.password}).then(function(user) {
                            res.status(201);
                            res.json({success: true, message: 'User created', user: user});
                        });
                    } else {
                        res.status(400);
                        res.json({success: false, message: 'Missing parameters'});
                    }
                } else {
                    res.status(400);
                    res.json({success: false, message: 'User already exists'});
                }
            });

        });
    });

    //Authentication of a user
    app.post('/api/authentication', function(req, res) {
        User.findOne({
            where: {
                username: req.body.username,
                password: req.body.password
            }
        }).then(function(user) {
            if (user) {
                //Expire within a week
                var expires = moment().add(7, 'days').valueOf();
                //Create token
                var token = jwt.encode({
                    iss: user.id,
                    exp: expires,
                    user: user.toJSON()
                }, config.secret_key);
                res.status(200);
                res.json({success: true, message: 'Authentication successful', token: token, expires: expires});
            } else {
                res.status(400);
                res.json({success: false, message: 'Invalid username or password'});
            }
        }, function(err) {
            res.status(400);
            res.json({success: false, message: 'Error'});
        });
    });
}
