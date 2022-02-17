const User = require('./userban.js');
const AccessToken = require('./AccessToken');

const mongoose = require('mongoose') //collection user +s
exports.smarty = (userId) => {
  return new Promise((resolve,reject) => {
     return AccessToken.findById(userId).then((user) => {
       if(user) {
         return user;
       }
     })
     .then(({user}) => {
      return User.findById(user)
    })
    .then((data) => {
      return resolve(data)
    })
     .catch((err) => {
       return reject(err)
     })
   });
}
