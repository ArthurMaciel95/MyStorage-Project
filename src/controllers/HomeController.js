exports.paginaInicial = (req, res) => {
  res.render('index');

  console.log(req.user);
};
