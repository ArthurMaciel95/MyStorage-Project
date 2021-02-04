module.exports.isLogged = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash('errors', 'Faça login para entrar na página!');
    return res.redirect('/user/login');
  }
  next();
};

exports.changePasswordAction = (req, res) => {
  //confirmar que as senhas batem
  if (req.body.password !== req.body['password-repeat']) {
    req.flash('errors', 'Seu e-mail ou senha estão incorretos');
    res.redirect(`/user/profile/${req.user._id}`);
    return;
  }
  // procurar o usuário e troca a senha dele
  req.user.setPassword(req.body.password, async () => {
    await req.user.save();
    req.flash('success', 'Senha alterada com sucesso!');
    res.redirect(`/user/profile/${req.user._id}`);
  });
  // redirecionar para o home
};
