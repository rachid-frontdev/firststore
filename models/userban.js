const mongoose = require('mongoose');
// require('../db.js')();

module.exports = mongoose.model('User', mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  isAdmin:{
    type:Boolean,
    default:false
  }
}));
