const helpers = require('../../helpers');

exports.middlewareGlobal = (req, res, next) => {
  res.locals.h = helpers;
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.user = req.user;
  next();
};
