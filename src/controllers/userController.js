const User = require('../models/User');
const crypto = require('crypto');
const mailHandler = require('../handlers/mailHandler');

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

exports.users = async (req, res) => {
  try {
    const users = await User.find();
    res.render('users', { users });
  } catch (e) {
    console.log(e);
    req.status = 500;
    req.flash('errors', 'não foi possivel acessar a basé de dados!');
  }

  res.redirect('/forum');
};

exports.changePassword = async (req, res) => {
  res.render('password');
};

exports.forget = (req, res) => {
  res.render('forget');
};

exports.forgetAction = async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).exec();
  if (!user) {
    req.flash('errors', 'O e-mail não foi encontrado na base de dados.');
    res.redirect('/user/forget-password');
    return;
  }

  user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordExpires = Date.now() + 3600000;

  await user.save();

  const resetLink = `http://${req.headers.host}/user/reset/${user.resetPasswordToken}`;
  const to = `${user.name} <${user.email}>`;
  const html = `Testando e-mail com link: <br/> <a href="${resetLink}">Resetar Sua senha</a>`;
  const text = `Testando e-mail com link: ${resetLink}`;

  mailHandler.send({
    to,
    subject: 'Resetar sua senha',
    html,
    text,
  });

  req.flash('success', `lhe enviamos um e-mail com intruções.`);
  res.redirect('/user/login');
};

exports.forgetToken = async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params._token,
      resetPasswordExpires: { $gt: Date.now() },
    }).exec();

    if (!user) {
      req.flash('errors', 'Token expirado!');
      res.redirect('/user/login');
      return;
    }
  } catch (e) {
    console.log(e);
  }
  res.render('forgetPassword');
};

exports.forgetTokenAction = async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params._token,
      resetPasswordExpires: { $gt: Date.now() },
    }).exec();

    if (!user) {
      req.flash('errors', 'Token expirado!');
      res.redirect('/user/login');
      return;
    }

    if (req.body.password !== req.body['password-repeat']) {
      req.flash('errors', 'Seu e-mail ou senha estão incorretos');
      res.redirect(`back`);
      return;
    }

    user.setPassword(req.body.password, async () => {
      await user.save();
      req.flash('success', 'Senha alterada com sucesso!');
      res.redirect(`/user/login`);
    });
  } catch (e) {
    console.log(e);
  }
};
