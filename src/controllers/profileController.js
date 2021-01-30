const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.profile = (req, res) => {
  res.render('profile');
};

exports.profileAction = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ _id: req.user._id }, req.body, {
      new: true, //Retornar NOVO item atualizado
      runValidators: true,
    });
  } catch (error) {
    console.log(error);
    req.flash('errors', 'error inesperado ocorreu!');
    res.redirect(`/user/profile/${req.params._id}`);
    return;
  }
  req.flash('success', 'Perfil atualizado com sucesso!');
  res.redirect('/forum');
};

exports.changePassword = (req, res) => {
  res.render('password');
};
