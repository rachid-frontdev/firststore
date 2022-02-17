const mongoose = require('mongoose');
// const MongoClient = require('mongodb').MongoClient;
const DB_Url = 'mongodb://localhost:27017/online-shop';
const bcrypt = require('bcrypt');
const User = require('./userban.js'); //collection user +s
const AuthenticationMethod = require('./AuthenticationMethod');
const AccessToken = require('./AccessToken');
const productionOpts = require('../setting')
exports.register = (req, res, next) => {
  console.log(req.body);
User.create(req.body).then(user => {
  return bcrypt.hash(req.body.password, 4)
  .then(secret => AuthenticationMethod.create({ user, secret })).then(() => user);
}).
then(user => res.json(user)).
catch(next);
};

exports.createNewUser = (username,email,password) => {
  return new Promise((resolve,reject) => {
       User.findOne({
        email:email
    }).then(user => {
      if(user){
        mongoose.disconnect();
        reject('this email is Used!!');
      } else {
        return User.create({username:username,email:email})
      }
    }).then(user => {
      return bcrypt.hash(password, productionOpts.BCRYPT_WORK_FACTOR).then(secret => AuthenticationMethod.create({ user, secret })).then(() => {
        mongoose.disconnect();
          return resolve({id:user._id,user})
      })
    }).catch(err => {
      mongoose.disconnect();
      reject(err);
    })
    // .then(hashedPass => {
    //   // Store hashed password in database
    //   // let user = new User({
    //   //   username:username,
    //   //   email:email
    //   //   // password:hashedPass
    //   // })
    // db.collection.insert
    //   // return user.save()
    // })
    // .then((user) => {
    //   // return AuthenticationMethod.create({ user, hashedPass });
    //   mongoose.disconnect();
    //   resolve({
    //     id:user._id
    //     // user
    //   });
    //   // resolve('user Created!!');
    // }).catch(err => {
    //   mongoose.disconnect();
    //   reject(err);
    // })
  })
}
exports.handleLogin = (req, res, next) => {
const { email, password } = req.body;
let user;
User.findOne({ email }).orFail()

.then(({ _id }) => {
user = _id;
return AuthenticationMethod.findOne({ user }).orFail();
}).

then(({ secret }) => bcrypt.compare(password, secret))
.then(success => {
if (!success) return next(Error('Incorrect Password'));
return AccessToken.create({ user });
}).
then(({ _id }) => res.json({ token: _id })).
catch(next);
};

exports.login = (email, password) => {
  let user;
  return new Promise((resolve,reject) => {
    mongoose.connect(DB_Url).then(() => {
      return User.findOne({email}).orFail();
    })
    .then(({ _id }) => {
    user = _id;
    return AuthenticationMethod.findOne({ user }).orFail();
  })
  .then(({ secret }) => {
      return bcrypt.compare(password, secret)
    })
    .then(same => {
    return AccessToken.create({ user })
  })
  .then(({_id}) => resolve({_id}))
  .catch(err => {
    console.log(err);
    return reject('Incorrect Password');
  })
})
}


    // .then(user => {
    //   bcrypt.compare(password, user.password).then(same => {
    //     if(!same) {
    //       mongoose.disconnect();
    //       reject('Incorrect Password!!');
    //     } else {
    //       mongoose.disconnect();
    //       resolve({
    //         id:user._id,
    //         isAdmin:user.isAdmin
    //       });
    //     }
    //   });
    // })
