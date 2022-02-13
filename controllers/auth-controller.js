const authModel = require('../models/authenticateModel.js');
const validationResult = require('express-validator').validationResult;
exports.postSignup = (req,res) => {
  const {username, email,password} = req.body;
  if(validationResult(req).isEmpty()) {
    authModel.createNewUser(username, email,password).
    then(user => {
      req.session.userId = user.id;
      // return res.json(user);
        return res.redirect('/');
    })
    .catch(err => {
      res.redirect('/signup');
    });
  } else {
    req.flash('validationErrors', validationResult(req).array());
    res.redirect('/signup')
  }

}
exports.getSignup = (req,res) => {
  res.render('signup', {
  title:'signup',
  validationErrors: req.flash('validationErrors')[0],
  isUser:false,
  isAdmin:false,
  csrfToken:req.csrfToken()
});
}
exports.getLogin = (req,res) => {
  res.render('login', {
  title:'login',
  validlogin:req.flash('validLogin'),
  notCorrect:req.flash('passValidNot'),
isUser:false,
isAdmin:false,
csrfToken:req.csrfToken()
});
//safe default!!
  req.session.userId = null;
  req.session.isAdmin = null;


}

exports.postLogin = (req,res) => {
  const {email,password} = req.body;
if(validationResult(req).isEmpty()) {
  authModel.login(email,password)
  .then(({_id}) => {
      // console.log('this is req.session.userid ' + _id);
    req.session.userId = _id;
    // req.session.isAdmin = twoVal.isAdmin;
    console.log({ token: _id });
    return res.redirect('/');
  })
  .catch(err => {
    console.log(err)
    req.flash('passValidNot', err);
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
  // delete the token that you saved on the client
  req.session.destroy((err) => {
    if(err) res.redirect('/error');
    res.clearCookie(process.env.SESS_NAME);
    //   req.flash('success', 'you are logouts')
    res.redirect('/login');
  });
}
