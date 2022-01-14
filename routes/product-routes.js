const router = require('express').Router();
const productController = require("../controllers/product-controller.js");
router.get('/:id', productController.detail);
module.exports = router;
