const mongoose = require('mongoose');
const DB_Url = 'mongodb://localhost:27017/online-shop';
const Product = require('../schema/productSchema.js');
const opts = {
useNewUrlParser: true,
useUnifiedTopology: true
};
exports.apiCount = () => {
  return new Promise((resolve,reject) => {
    mongoose.connect(DB_Url,opts).then(() => {
      return Product.countDocuments({});
         })
        .then((count) => {
      mongoose.disconnect();
       resolve(count)
       // close connection
     })
    .catch(err => {
       mongoose.disconnect();
       reject(err)
     });
  });
}
