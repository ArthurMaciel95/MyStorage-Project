const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  photo: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  birthday: { type: String },
  country: { type: String },
  city: { type: String },
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', userSchema);
