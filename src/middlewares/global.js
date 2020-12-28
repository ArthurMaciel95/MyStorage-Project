const helpers = require('../../helpers');

exports.middlewareGlobal = (req, res, next) => {
  res.locals.h = { ...helpers };
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.user = req.user;

  if (req.isAuthenticated()) {
    //filtrar menu para guest ou logged
    res.locals.h.menu = res.locals.h.menu.filter((i) => i.logged);
  } else {
    //filtrar menu para guest
    res.locals.h.menu = res.locals.h.menu.filter((i) => i.guest);
  }
  next();
};
