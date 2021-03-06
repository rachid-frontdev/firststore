const express = require('express'),
      path = require('path'),
      app = express();
const db = require('./db.js');
require('dotenv/config');
const homeRouter = require(path.join(__dirname, 'routes','home-routes.js'));
const productRouter = require(path.join(__dirname, 'routes','product-routes.js'));
const authRouter = require(path.join(__dirname, 'routes','auth-routes.js'));
const cartRouter = require(path.join(__dirname, 'routes','cart-routes.js'));
const adminRouter = require(path.join(__dirname, 'routes','admin-routes.js'));
var session = require('express-session');
const flash = require('connect-flash');
const helmet = require("helmet");
const SessionStore = require('connect-mongodb-session')(session);
const csurf = require('csurf');
const smartUserModel = require('./models/smartUser');
const port = process.env.PORT || 3000;
const productionOpts = require('./setting')
const server = app.listen(port, () => {
  console.log('server run')
});
// Handling Error
process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`)
  server.close(() => process.exit(1))
});

db();
// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'folder')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
const {
  SESS_NAME,
  NODE_ENV = 'development'
} = process.env;

const IN_PROD = NODE_ENV === 'production';
const store = new SessionStore({
  uri:'mongodb://localhost:27017/online-shop',
  collection:'sessions'
});
// Catch errors
store.on('error', (error) => {
  console.log(error);
});
//manage http header security
app.use(helmet());
app.use(session({
  name:SESS_NAME,
    secret:productionOpts.SESSION_SECRET_KEY,
    saveUninitialized:false,
    resave:false ,
    cookie: {
      secure: IN_PROD,
      ephemeral:productionOpts.SESSION_EPHEMERAL_COOKIES,//destroy cookie when browser closes
      httpOnly:true,
      sameSite:true,
      expires:productionOpts.SESSION_DURATION,
      maxAge:productionOpts.SESSION_EXTENSION_DURATION
  },
    store:store
  }));
app.use(csurf());
app.use(flash());
app.use(homeRouter);
app.use(authRouter);
app.use('/product', productRouter);
// app.use('/cart', cartRouter);

app.use('/admin',adminRouter);
app.get('/not-admin', (req,res) => {
  res.status(403);
  res.render('not-admin.ejs', {
    title:'500 ERROR',
    isUser:req.session.userId,
    isAdmin:false
  });
})
app.get('/error', (req,res) => {
  res.status(500);
  res.render('errorhandling', {
    title:'500 ERROR',
    isUser:req.session.userId,
    isAdmin:req.session.isAdmin
  });
});
/*
app.use((err,req,res,next) => {
if (err.code !== 'EBADCSRFTOKEN') return next(err)

if(!(req.session && req.session.userId)) {
  next();
}
// smartUserModel.smarty(req.session.userId)
// .then((user) => {
//     console.log('here', user);
    // req.user = user;
    // res.locals.user = user;
  next()
// })
// .catch(err=> {
//   console.log('in smart',err.message);
// })
// const {userId} = req.session;
// if(userId) {
//   console.log('from app.use',userId);
//     // req.session.userId = user.id;
//
//     // return res.locals.user = userId;
// }
// return next();
// // res.status(500).render('error');
});
*/
