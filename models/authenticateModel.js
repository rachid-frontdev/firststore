const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const DB_Url = 'mongodb://localhost:27017/online-shop';
const bcrypt = require('bcrypt');
const User = require('./schema/authSchema.js'); //collection user +s
exports.createNewUser = (username,email,password) => {
  return new Promise((resolve,reject) => {
    mongoose.connect(DB_Url).then(() => {
      return User.findOne({
        email:email
      })
    }).then(user => {
      if(user){
        mongoose.disconnect();
        reject('this email is Used!!');
      }
      else {
       return bcrypt.hash(password, 12)
      }
    }).then(hashedPass => {
      // Store hashed password in database
      let user = new User({
        username:username,
        email:email,
        password:hashedPass
      })
      return user.save()
    }).then((user) => {
      // console.log('from model', user);
      mongoose.disconnect();
      resolve({
        id:user._id});
      // resolve('user Created!!');
    }).catch(err => {
      mongoose.disconnect();
      reject(err);
    })
  })
}
exports.login = (email, password) => {
  return new Promise((resolve,reject) => {
    mongoose.connect(DB_Url).then(() => {
      return User.findOne({
        email:email
      }).orFail();
    }).then(user => {
      bcrypt.compare(password, user.password).then(same => {
        if(!same) {
          mongoose.disconnect();
          reject('password is incorrect!!');
        } else {
          mongoose.disconnect();
          resolve({
            id:user._id,
            isAdmin:user.isAdmin
          });
        }
      });
    }).catch(err => {
      mongoose.disconnect();
      reject(`there is no user matches to ${err.query.email}`);
    });
  });
}
