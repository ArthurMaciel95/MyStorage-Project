const User = require('../models/User');

exports.login = (req, res) => {
  res.render('login');
};

exports.loginAction = (req, res) => {
  const auth = User.authenticate();

  auth(req.body.email, req.body.password, (error, result) => {
    if (!result) {
      req.flash('errors', 'Seu e-mail e/ou senha estão errados!');
      res.redirect('/user/login');
      return;
    }

    req.login(result, () => {
      console.log(`usuário: ${req.user.name}, logado com sucesso.`);
    });

    req.flash('success', 'Login efetuado com sucesso!');
    res.redirect('/forum');
  });
};

exports.register = (req, res) => {
  res.render('register');
};

exports.registerAction = (req, res) => {
  const newUser = new User(req.body);
  User.register(newUser, req.body.password, (error) => {
    if (error) {
      console.log(error);
      req.flash('errors', 'Erro ao tentar registrar!');
      res.redirect('/user/register');
      return;
    }
    req.flash('success', 'Registro efetuado com sucesso, Faça o login.');
    res.redirect('login');
  });
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};
