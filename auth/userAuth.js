var jwt = require('jwt-simple');
var config = require('../config/config.js');
var db = require('../database/db.js');
var User = db.User;
module.exports = function() {
  return function(req, res, next) {
    //Try to extract token from the request
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    if (token) {
      try {
        //Decoded JWT
        var decoded = jwt.decode(token, config.token.secret_key);
        if (decoded.exp <= Date.now()) {
          res.status(401);
          res.json({success: false, message: 'Access token has expired'});
        }
        //If user exists in database
        User.findOne({
          where: {
            id: decoded.user.id
          }
        }).then(function(user) {
          if (user) {
            next();
          } else {
            res.status(401);
            res.json({success: false, message: 'Credentials for access token not found'});
          }
        });
      } catch (err) {
        res.status(401);
        res.json({success: false, message: 'Invalid access token'});
        console.log(err);
      }
    } else {
      res.status(401);
      res.json({success: false, message: 'No access token found'});
    }
  }
};
