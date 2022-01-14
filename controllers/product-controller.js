const productModel = require('../models/products-model.js');
exports.detail = (req,res) => {
let id = req.params.id;
productModel.getProductById(id).then(products => {
  res.render('product', {
  title:'home',
product:products,
isUser:req.session.userId,
isAdmin:req.session.isAdmin
});
}).catch((err) => res.redirect('/error'))
}
