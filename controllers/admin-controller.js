const validationResult = require('express-validator').validationResult;
const productModel = require('../models/products-model.js');

exports.getAdd = (req,res) => {
  res.render('add-product', {
    title:'add Product',
    isUser:true,
    isAdmin:true,
    validationErrors:req.flash('validationErrors')
  });
}

exports.postAdd = (req,res) => {
  const {title,price,rating,category} = req.body;
  if(validationResult(req).isEmpty()) {
    const {filename} =  req.file;
    return productModel.addByAdmin({
      title,
      filename,
      price,
      rating,
      category
    })
    .then(() => {
      res.redirect('/')
    })
    .catch(err => res.redirect('/error'));
  } else {
console.log('we can\'t add product' );
req.flash('validationErrors', validationResult(req).array());
res.redirect('/admin/add');
  }
}
/*
to add product View

    <% let priceError = validationErrors.find(err => err.param === 'price') %>
    <% if (priceError) { %>
      <p class="alert alert-danger"><%=priceError.msg %></p>
      <% } %>
      */
