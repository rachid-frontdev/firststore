const cartModel = require('../models/cart-model.js');
const validationResult = require('express-validator').validationResult;
exports.getCart = (req,res) => {
  cartModel.getItemByUserId(req.session.userId).then((items) => {
    res.render('cart', {
      title:'cart',
      items:items,
      isUser:true,
      isAdmin:req.session.isAdmin
    });
  }).catch(err => res.redirect('/error'));
}
exports.postCart = (req,res) => {
  const {amount, price,name, productId} = req.body;
  if(validationResult(req).isEmpty()) {
    cartModel.addNewItem({
      name,
      price,
      amount,
      productId,
      userId:req.session.userId,
      timestamp:Date.now()
    }).then(() => {
      //show if addit
      res.redirect('/cart')
    }).catch(err => res.redirect('/error'));
  } else {
      req.flash('validationErrors', validationResult(req).array());
      res.redirect(req.body.redirectTo);
  }
}
exports.postSave = (req,res) => {
  if(validationResult(req).isEmpty()) {
cartModel.editItem(req.body.cartId, {
  amount:req.body.amount,
  timestamp:Date.now()
}).then(() => res.redirect('/cart')).catch(err => res.redirect('/error'));
 } else {
      req.flash('validationErrors', validationResult(req).array());
      res.redirect(req.body.redirectTo);
  }
}
exports.postDelete = (req,res) => {
  cartModel.deleteItem(req.body.cartId).then(() => res.redirect('/cart')).catch(err => console.log(err));
}
exports.postDeleteAll = (req,res) => {
    cartModel.deleteAll().then(() => res.redirect('/cart')).catch(err => console.log(err));
}
exports.postOrder =  (req,res) => {
  res.redirect('/verifyOrder')
}
exports.getOrder =  (req,res) => {
  res.render('verifyOrder', {
    title:'completeOrder',
    isUser:true,
    isAdmin:false

  });
}
exports.addToOrders = (req,res) => {
  res.redirect('/orders')
}
exports.listOrders = (req,res) => {
  res.render('order', {
    title:'list of Orders',
    isUser:true,
    isAdmin:false
  });

}
exports.cancelOrder = (req,res) => {
  cartModel.deleteItem(req.body.orderId).then(() => res.redirect('/orders')).catch(err => res.redirect('/error'));
}
