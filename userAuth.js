var jwt = require('jwt-simple');
var User = require('./models/User.js');
module.exports = function(req, res, next) {
  //Try to extract token from the request
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  if (token) {
    try {
      //Decoded JWT
      var decoded = jwt.decode(token, app.get('KEY'));
      if (decoded.exp <= Date.now()) {
        res.end('Token has expired', 400);
      }
      //If an user is found
      User.findOne({
        where: {
          id: decoded.user.id
        }
      }, function(err, user) {
        console.log(user);
        req.user = user;
      });
    } catch (err) {
      return next();
    }
  } else {
    //todo
    console.log('No token found');
    next();
  }
};
