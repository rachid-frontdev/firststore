const mongoose = require('mongoose');
const productSchema =  mongoose.Schema({
  id:Number,
  title:String,
  filename:String,
  price:Number,
  rating:Number,
  category:String
});
module.exports = mongoose.model('product', productSchema);
