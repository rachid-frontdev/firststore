let querystring = require('querystring');
const productModel = require('../models/products-model.js');
const validationResult = require('express-validator').validationResult;
const count = require('../models/apicount/document.js').apiCount;

exports.getHome = (req,res) => {
  // check if user login
  // get total documents in the Posts collection
  const {page} = req.query;
  const {userId} = req.session;
  // const {userId = req.sessionID} = req.session;
  let validCategories = ['clothes', 'phones', 'electronics'];
  let category = req.query.category;
  let productsPromise;
if (category && validCategories.includes(category)) productsPromise = productModel.getProductsByCategory(category);
else {
  productsPromise = productModel.getAllProducts(page);
}

productsPromise.then((products) => {
  count().then((count) => {
    const limit = 5;
    res.render('index', {
    title:'home',
    product:products,
  isUser:userId,
  success:req.session.success,
  errors:req.session.errors,
  validationErrors:req.flash('validationErrors')[0],
  currentPage: page,
  totalPages: Math.ceil(count / limit)
});
});
}).catch(err => {
  return res.redirect('/error')
});
//safe default!!
req.session.errors = null;
}
