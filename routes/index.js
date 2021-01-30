const express = require('express');
const router = express.Router();
const HomeController = require('../src/controllers/HomeController');
const ContactController = require('../src/controllers/ContactController');
const WhousController = require('../src/controllers/WhoUsController');
const userController = require('../src/controllers/userController');
const storeController = require('../src/controllers/StoreController');
const forumController = require('../src/controllers/forumController');
const PostController = require('../src/controllers/PostController');
const profileController = require('../src/controllers/profileController');
const imageMiddleware = require('../src/middlewares/imageMiddleware');
const authMiddleware = require('../src/middlewares/authMiddleware');
const passwordController = require('../src/controllers/userController');

router.get('/', HomeController.paginaInicial);
router.get('/contact', ContactController.contact);
router.get('/whous', WhousController.whous);

router.get('/user/login', userController.login);
router.post('/user/login', userController.loginAction);

router.get('/user/register', userController.register);
router.post(
  '/user/register',
  imageMiddleware.upload,
  imageMiddleware.resize,
  userController.registerAction,
);
router.get('/user/logout', userController.logout);

router.get('/users', authMiddleware.isLogged, userController.users);

router.get(
  '/user/profile/:_id',
  authMiddleware.isLogged,
  imageMiddleware.upload,
  imageMiddleware.resize,
  profileController.profile,
);
router.post(
  '/user/profile/:_id',
  authMiddleware.isLogged,
  imageMiddleware.upload,
  imageMiddleware.resize,
  profileController.profileAction,
);

router.get(
  '/profile/password',
  authMiddleware.isLogged,
  passwordController.changePassword,
);

router.post(
  '/profile/password',
  authMiddleware.isLogged,
  authMiddleware.changePasswordAction,
);

router.get('/store', authMiddleware.isLogged, storeController.market);
router.get('/forum', authMiddleware.isLogged, forumController.post);

router.get('/create-post', authMiddleware.isLogged, PostController.createPost);
router.post(
  '/create-post',
  authMiddleware.isLogged,
  imageMiddleware.upload,
  imageMiddleware.resize,
  PostController.createPostAction,
);

router.get(
  '/create-post/:slug/edit',
  authMiddleware.isLogged,
  PostController.edit,
);
router.post(
  '/create-post/:slug/edit',
  authMiddleware.isLogged,
  imageMiddleware.upload,
  imageMiddleware.resize,
  PostController.editAction,
);

router.get('/forum/:slug', authMiddleware.isLogged, PostController.view);

module.exports = router;
