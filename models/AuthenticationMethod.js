const mongoose = require('mongoose');
const {Schema} = mongoose;
const ObjectId = require('mongoose').ObjectId;
// require('../db.js')();
module.exports = mongoose.model('AuthenticationMethod', Schema({
type: {
type: String,
enum: ['PASSWORD', 'FACEBOOK_OAUTH']
},
// `secret` stores the password hash for password auth,
// or the access token for Facebook OAuth.
secret: String,
user: { type: ObjectId, ref: 'User' }
}));
