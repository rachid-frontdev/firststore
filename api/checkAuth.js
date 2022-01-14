const AccessToken = require('../models/AccessToken.js');
const User = require('../models/User');
module.exports = function checkAuth(req, res, next) {
AccessToken.findOne({ _id: req.headers.authorization }).
orFail().
then(({ user }) => User.findOne({ _id: user }).orFail()).
then(user => {
req.user = user;
next();
}).
catch(next);
};
