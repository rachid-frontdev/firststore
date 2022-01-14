const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart-controller.js');
const authGuard = require('./protect/auth.guard.js');
const check = require('express-validator').check;
// authGuard.isAuth,
router.get('/', cartController.getCart);
// authGuard.isAuth,
router.post('/',check('amount').not().isEmpty().withMessage('amount is required!!').isInt({min:1}).withMessage('at least one product'),
cartController.postCart);
router.post('/order',cartController.postOrder);
router.get('/verifyOrder', cartController.getOrder);
router.post('/orderAddress',cartController.addToOrders);
router.get('/orders',cartController.listOrders);
router.post('/order/cancel',cartController.cancelOrder)
// authGuard.isAuth,
router.post('/save',
check('amount').not().isEmpty().withMessage('amount is required!!').isInt({min:1}).withMessage('at least one product'),
cartController.postSave);
// authGuard.isAuth,
router.post('/delete',cartController.postDelete);
router.post('/deleteAll',
cartController.postDeleteAll);
module.exports = router;
