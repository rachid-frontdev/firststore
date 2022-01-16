const authModel = require('../models/authenticateModel.js');
const validationResult = require('express-validator').validationResult;

exports.postSignup = (req,res) => {
  const {username, email,password} = req.body;
  if(validationResult(req).isEmpty()) {
    authModel.createNewUser(username, email,password)
    .then((user) => {
      // console.log('from controller', user.id);
      req.session.userId = user.id;
      return res.redirect('/');
    })
    .catch(err => {
      res.redirect('/signup');
    });
  } else {
    res.redirect('/signup')
    req.flash('validationErrors', validationResult(req).array());
  }

}
exports.getSignup = (req,res) => {
  console.log(req.flash('validationErrors'));
  res.render('signup', {
  title:'signup',
  validationErrors: req.flash('validationErrors'),
  isUser:false,
  isAdmin:false

});
}
exports.getLogin = (req,res) => {
  res.render('login', {
  title:'login',
  validlogin:req.flash('validLogin'),
isUser:false,
isAdmin:false
});
//safe default!!
  req.session.userId = null;
  req.session.isAdmin = null;


}
exports.postLogin = (req,res) => {
  const {email,password} = req.body;
if(validationResult(req).isEmpty()) {
  authModel.login(email,password)
  .then((twoVal) => {
    console.log('this is req.session.userid ' + twoVal.id);
  req.session.userId = twoVal.id;
  req.session.isAdmin = twoVal.isAdmin;
  return res.redirect('/');
  })
  .catch(err => {
    console.log(err);
    res.redirect('/login');
  });
} else {
  req.flash('validLogin', validationResult(req).array());
  res.redirect('/login');
}

}
// exports.postLogin = (req,res) => {
//
// const createItems = async () => {
//       const client = await MongoClient.connect('mongodb://localhost:27017',{
//            useNewUrlParser: true,
//            useUnifiedTopology: true,
//        });
//
//           console.log('connected to database');
//           let db = client.db('online-shop');
//          const items = await db.collection('users').insertOne({
//            name:req.body.username,
//            password:req.body.password
//          })
//          console.log(items);
//          res.redirect('/')
//          // close connection
//           client.close();
//
// }
//    createItems();

// try {
//
//   mongoose.connect(DB_Url,{
//        useNewUrlParser: true,
//        useUnifiedTopology: true},(err) => {
//
//          const newUser = new User({
//            name:req.body.username,
//            password:req.body.password
//          });
//          newUser.save(err,result => {
//            // close connection
//            mongoose.disconnect();
//            res.redirect('/');
//          });
//        })
// }
// catch (e) {
//       console.log("Error!" + e);
// }
// }
exports.logout = (req,res) => {
  // req.logout();
  req.session.destroy((err) => {
    if(err) res.redirect('/error');
    res.clearCookie('sid');
    res.redirect('/login');
  });
  // req.session.save((err) => {
  //   req.flash('success', 'you are logouts')
  //   res.redirect('/login');
  // });
}
