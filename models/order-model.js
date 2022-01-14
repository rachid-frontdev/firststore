const mongoose = require('mongoose');
const DB_Url = 'mongodb://localhost:27017/online-shop';

var orderSchema =  mongoose.Schema({
  name:String,
  price:Number,
  amount:Number,
  productId:String,
  userId:String,
  timestamp:Number,
  address:String,
status:{
  type:String,
  default:'Pending'
}});
const Order = mongoose.model('order', orderSchema); //collection user +s
exports.addNewOrder = (data) => {
  return new Promise((resolve,reject) => {
    cartModel.deleteItem(data.cartId)
    .then(() => mongoose.connect(DB_Url))
    .then(() => {
         data.timestamp = Date.now();
         let orders = new Order(data);
         return orders.save();
       }).then(() => {
         mongoose.disconnect();
         resolve();
       }).catch((err) => {
         mongoose.disconnect();
         reject(err);
       })
  })
}
