const crypto = require('crypto');
const mongoose = require('mongoose');
const DB_Url = 'mongodb://localhost:27017/online-shop';
const bcrypt = require('bcrypt');
const promisify = require('util').promisify;
const AuthenticationMethod = require('./AuthenticationMethod');
const Ban = mongoose.model('ban', mongoose.Schema({
email: { type: String, required: true },
password: {
type: String,
required: true,
// `password` will be excluded when you do `User.find()`
// unless you explicitly project it in.
select: false
}
}));
// authentication method

(async () => {
  try{
    mongoose.connect(DB_Url)
    // // let pw = await   bcrypt.hash(password, 12)
    // let pw = await promisify(bcrypt.hash).call(bcrypt, 'taco', 5);
    // await Ban.create({
    // email: 'shawarma@theleague.com',
    // password: pw
    // });

    let user = await Ban.findOne({});
    return console.log(user);
    // let user = await AuthenticationMethod.findOne({ user });
  } catch(err) {
    console.log(err);
  }
})()

// function findUsers() {
//   console.log(user.password); // undefined
//    user = await Ban.findOne().select('+password');
//     console.log(user.password); // String containing password hash
//
// }


// require('../db.js');
// module.exports = mongoose.model('AccessToken', Schema({
// _id: {
// type: String,
// required: true,
// default: () => crypto.randomBytes(50).toString('base64')
// },
// user: { type: 'ObjectId', ref: 'User', required: true }
// }));
