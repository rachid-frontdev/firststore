const AccessToken = require('../models/AccessToken');
const AuthenticationMethod =
require('../models/AuthenticationMethod');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
exports.handleLogin = (req, res, next) => {
const { email, password } = req.body;
let user;
User.findOne({ email }).orFail().then(({ _id }) => {
user = _id;
return AuthenticationMethod.findOne({ user }).orFail();
}).
then(({ secret }) => bcrypt.compare(password, secret)).
then(success => {
if (!success) return next(Error('Incorrect Password'));
return AccessToken.create({ user });
}).
then(({ _id }) => res.json({ token: _id })).
catch(next);
};
