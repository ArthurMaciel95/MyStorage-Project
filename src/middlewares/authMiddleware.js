module.exports.isLogged = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash('errors', 'Faça login para entrar na página!');
    return res.redirect('/user/login');
  }
  next();
};
