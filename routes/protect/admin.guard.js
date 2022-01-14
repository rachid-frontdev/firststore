module.exports = (req,res,next) => {
  // if(req.session.isAdmin) {
  if(true) {
    return next();
  } else {
     return res.redirect('/not-admin')
  }
}
