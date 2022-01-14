const express = require('express');
const router = express.Router();
const check = require('express-validator').check;
const authController = require('../controllers/auth-controller.js');
const authGuard = require('./protect/auth.guard.js');

router.get('/signup' ,authGuard.notAuth,authController.getSignup);
router.post('/signup',authGuard.notAuth,
  check('username').not().isEmpty(),
  check('email').not().isEmpty().withMessage('email is Required!')
  .isEmail().withMessage('invalid Format'),
  check('password').not().isEmpty().isLength({min:6}),
    check('confirmpass').custom((value, {req}) => {
      if(value === req.body.password ) return true;
      else throw 'password don\'t equal'
    }),
 authController.postSignup);
router.get('/login', authGuard.notAuth, authController.getLogin);
router.post('/login',authGuard.notAuth,
check('email').not().isEmpty().withMessage('email Required').isEmail().withMessage('use @example.com'),
check('password').not().isEmpty().withMessage('password Required').isLength({min:6}).withMessage('should password at least 6 character'),
authController.postLogin);
router.all('/logout',authGuard.isAuth, authController.logout);
module.exports = router;
