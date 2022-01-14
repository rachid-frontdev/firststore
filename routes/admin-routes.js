const express = require('express');
const check = require('express-validator').check;
const router = express.Router();
const multer = require('multer');
const adminController = require('../controllers/admin-controller.js');
const adminGuard = require('./protect/admin.guard.js');
const upload = multer({
  storage:multer.diskStorage({
    destination:(req,file,cb) => {
    cb(null,'folder/')
  },
  filename: (req,file,cb) => {
  cb(null,"image/" + Date.now() + '--' + file.originalname)
}
})
});

router.get('/add',adminGuard, adminController.getAdd);
router.post('/add',
adminGuard,
upload.single('filename'),
check('filename').custom((value,{req}) => {
  if(req.file) return true;
  else throw 'image is required!!'
}),
check('title').not().isEmpty().withMessage('title is required!'),
adminController.postAdd);

// router.get('/orders',adminGuard(),adminController.getAdmin);

module.exports = router
