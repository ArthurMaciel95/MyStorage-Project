const mongoose = require('mongoose');
const slug = require('slug');
mongoose.Promise = global.Promise;

const ObjectId = mongoose.SchemaTypes.ObjectId;

const postSchema = new mongoose.Schema({
  photo: String,
  title: { type: String, trim: true, required: 'o post precisa de um titulo' },
  subtitle: { type: String, trim: true, required: true },
  slug: String,
  body: {
    type: String,
    trim: true,
    required: 'o corpo precisa ser preenchido',
  },
  tags: [String],
  author: {
    type: ObjectId,
    ref: 'User',
  },
  createDate: { type: Date, default: Date.now },
});

postSchema.pre('save', async function (next) {
  if (this.isModified('title')) {
    this.slug = slug(this.title, { lower: true });

    const slugRegex = new RegExp(`^(${this.slug})((-[0-9]{1,}$)?)$`, 'i');

    const postsWithSlug = await this.constructor.find({ slug: slugRegex });

    if (postsWithSlug.length > 0) {
      this.slug = `${this.slug}-${postsWithSlug.length + 1}`;
    }
  }

  next();
});

postSchema.statics.getTagsList = function () {
  return this.aggregate([
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 } } },
    { $sort: { count: -1, _id: 1 } },
  ]);
};



module.exports = mongoose.model('Post', postSchema);
