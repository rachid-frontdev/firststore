const mongoose = require('mongoose');
const DB_Url = 'mongodb://localhost:27017/online-shop';

var cartSchema =  mongoose.Schema({
  name:String,
  price:Number,
  amount:Number,
  productId:String,
  userId:String,
  timestamp:Number});
const CartItem = mongoose.model('cart', cartSchema); //collection user +s
exports.addNewItem = (data) => {
  return new Promise((resolve,reject) => {
    mongoose.connect(DB_Url).then(() => {
      let item = new CartItem(data);
      return item.save();
    }).then(() => {
      mongoose.disconnect();
      resolve();
    }).catch((err) => {
      mongoose.disconnect();
      reject(err);
    });
  });
}
exports.getItemByUserId = (userId) => {
  return new Promise((resolve,reject) => {
    mongoose.connect(DB_Url,{
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
        return CartItem.find({
          userId:userId
        },{},{
          sort:{timestamp:1}
        }).orFail();
     }).then(items => {
   mongoose.disconnect();
   resolve(items)
 }).catch(err => {
   mongoose.disconnect();
   reject(err)
 });

  });
}
exports.editItem = (id, newData) => {
  return new Promise((resolve,reject) => {
    mongoose.connect(DB_Url).then(() => {
      return CartItem.updateOne({_id:id}, newData);
     }).then(items => {
   mongoose.disconnect();
   resolve(items);
 }).catch(err => {
   mongoose.disconnect();
   reject(err);
 });

  });
}
exports.deleteItem = (id) => {
  return new Promise((resolve,reject) => {
    return mongoose.connect(DB_Url).then(() => {
      //CartItem.remove
      return CartItem.deleteOne({_id:id})
    }).then(() => {
  mongoose.disconnect();
  resolve();
}).catch(err => {
  mongoose.disconnect();
  reject(err);
});
  })
}
exports.deleteAll = () => {
  return new Promise((resolve,reject) => {
    return mongoose.connect(DB_Url).then(() => {
      //CartItem.remove
      return CartItem.remove({})
    }).then(() => {
  mongoose.disconnect();
  resolve();
}).catch(err => {
  mongoose.disconnect();
  reject(err);
});
  })
}
