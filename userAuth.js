var jwt = require('jwt-simple');
var User = require('./models/User.js');
var config = require('./config.js');
module.exports = function(req, res, next) {
  //Try to extract token from the request
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  if (token) {
    try {
      //Decoded JWT
      var decoded = jwt.decode(token, config.secret_key);
      if (decoded.exp <= Date.now()) {
        res.json({success: false, message: 'Access token has expired'});
      }
      //If an user is found
      User.findOne({
        where: {
          id: decoded.user.id
        }
      }, function(err, user) {
        if (user.password != req.body.password) {
          res.json({success: false, message: 'Invalid username or password'});
        } else {
          console.log("Authentication successful");
          next();
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
};
