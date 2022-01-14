const express = require('express');
const router = express.Router();
const homeController= require('../controllers/home-controller.js');
const authGuard = require('./protect/auth.guard.js');
// const expressValidator = require('express-validator');
const check = require('express-validator').check;
router.get('/', homeController.getHome);
module.exports = router;
