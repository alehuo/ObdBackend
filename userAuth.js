var jwt = require('jwt-simple');

var config = require('./config.js');
module.exports = function(User) {
  return function(req, res, next) {
    //Try to extract token from the request
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    if (token) {
      try {
        //Decoded JWT
        var decoded = jwt.decode(token, config.secret_key);
        if (decoded.exp <= Date.now()) {
          res.json({success: false, message: 'Access token has expired'});
        }
        console.log(decoded);
        //If an user is found
        User.findOne({
          where: {
            id: decoded.user.id
          }
        }).then(function(user) {
          if (user) {
            next();
          } else {
            res.json({success: false, message: 'Credentials for access token not found'});
          }
        });
      } catch (err) {
        res.json({success: false, message: 'Invalid access token'});
        console.log(err);
      }
    } else {
      //todo
      res.json({success: false, message: 'No access token found'});
      next();
    }
  }
};
