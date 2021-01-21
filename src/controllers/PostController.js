const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const slug = require('slug');

exports.view = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });

  //2. carregar o formulário de edição
  res.render('view', { post });
};

exports.createPost = (req, res) => {
  res.render('createPost');
  console.log(req.user);
};

exports.createPostAction = async (req, res) => {
  req.body.tags = req.body.tags.split(',').map((tag) => tag.trim());
  req.body.author = req.user._id;

  const post = new Post(req.body);

  try {
    await post.save();
  } catch (error) {
    req.flash('errors', 'Os campos precisam ser preenchidos.');

    return res.redirect('/forum');
  }
  req.flash('success', 'Post salvo con sucesso!');
  res.redirect('/forum');
};

exports.edit = async (req, res) => {
  //1.pegar as informações do posts em questão

  const post = await Post.findOne({ slug: req.params.slug });

  //2. carregar o formulário de edição
  res.render('postEdit', { post });
  //3.
};

exports.editAction = async (req, res) => {
  req.body.tags = req.body.tags.split(',').map((tag) => tag.trim());
  req.body.slug = slug(req.body.title, { lower: true });

  try {
    const post = await Post.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      {
        new: true, //Retornar NOVO item atualizado
        runValidators: true,
      },
    );
  } catch (error) {
    req.flash('errors', 'Os campos precisam ser preenchidos.');
    return res.redirect('/create-post/' + req.params.slug + '/edit');
  }

  req.flash('success', 'Post atualizado com sucesso!');

  res.redirect('/forum');
};
