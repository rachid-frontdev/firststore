const crypto = require('crypto');
const mongoose = require('mongoose');
const { Schema } = mongoose;
require('../db.js');
let Model = mongoose.model('AccessToken', Schema({
_id: {
type: String,
required: true,
default: () => crypto.randomBytes(50).toString('base64')
},
user: { type: 'ObjectId', ref: 'User', required: true }
}));
module.exports = Model;
