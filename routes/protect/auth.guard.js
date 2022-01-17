exports.isAuth = (req,res,next) => {
  if(req.session.userId) next();
  else res.redirect('/login');
}

exports.notAuth = (req,res,next) => {
  if(!req.session.userId) next();
  else res.redirect('/');
}
exports.redirectHome = (req,res,next) => {
  if(req.session.userId) res.redirect('/login');
  else next();
}
