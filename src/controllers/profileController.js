exports.profile = (req, res) => {
  res.render('profile');
};

exports.profileAction = (req, res) => {
  req.flash('success', 'dados salvos com sucesso!');
  res.redirect('/forum');
};
