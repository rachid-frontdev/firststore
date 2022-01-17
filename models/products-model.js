const mongoose = require('mongoose');
const DB_Url = 'mongodb://localhost:27017/online-shop';
const opts = {
useNewUrlParser: true,
useUnifiedTopology: true
};
const Product = require('./schema/productSchema.js');
const connection = mongoose.createConnection(DB_Url,opts);
//any communicate with db
exports.getAllProducts = (page) => {
  const limit = 5;

  return new Promise((resolve,reject) => {
    mongoose.connect(DB_Url,opts).then(() => {
       if(page == undefined) {
        return Product.find({}).limit(limit * 1).skip((1 - 1) * limit);
      } else {
      return Product.find({}).limit(limit * 1).skip((page - 1) * limit);
      }
         })
        .then((product) => {
      mongoose.disconnect();
       resolve(product)
       // close connection
     })
    .catch(err => {
       mongoose.disconnect();
       reject(err)
     });
  });
}
exports.getProductsByCategory = (category) => {
  return new Promise((resolve,reject) => {
    mongoose.connect(DB_Url,opts)
         .then(() => {
            return Product.find({category}).orFail();
         })
     .then(product => {
       // close connection
       mongoose.disconnect();
       resolve(product)
     }).catch(err => {
       mongoose.disconnect();
       reject(err)
     });
  });
}
exports.getProductById = (id) => {
  return new Promise((resolve,reject) => {
    mongoose.connect(DB_Url,opts).then(() => {
      return Product.findById(id).orFail();
    }).then(product => {
           // close connection
           mongoose.disconnect();
           resolve(product)
         }).catch(err => {
           mongoose.disconnect();
           reject(err)
         });

  })
}
exports.addByAdmin = (data) => {
  return new Promise((resolve,reject) => {
    mongoose.connect(DB_Url).then(() => {
            let createProduct = new Product(data);
            return createProduct.save()
         })
     .then(() => {
       mongoose.disconnect();
       resolve();
       // close connection
     }).catch(err => {
       mongoose.disconnect();
       reject(err);
     });
  });
}
