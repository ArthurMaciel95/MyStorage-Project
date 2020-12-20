const mongoose = require('mongoose');
const Post = mongoose.model('Post');

// exports.post = async (req, res) => {
//   let responseJson = {
//     posts: [],
//     tags: [],
//   };

//   console.log(tags);

//   const posts = await Post.find();
//   responseJson.posts = posts;
// };

exports.market = async (req, res) => {
  let ListTags = {
    tags: [],
    posts: [],
    tag: '',
  };

  ListTags.tag = req.query.t;
  const postFilter =
    typeof ListTags.tag !== 'undefined' ? { tags: ListTags.tag } : {};

  try {
    const tagsPromise = Post.getTagsList();
    const postsPromise = Post.find(postFilter);

    const [tags, posts] = await Promise.all([tagsPromise, postsPromise]);

    ListTags.tags = tags;
    ListTags.posts = posts;
  } catch (e) {
    console.log(e);
    res.status(500);
    console.log('servidor ERROR');
  }
  res.render('store', ListTags);
};
