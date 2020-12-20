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

router.get('/', HomeController.paginaInicial);
router.get('/contact', ContactController.contact);
router.get('/whous', WhousController.whous);

router.get('/user/login', userController.login);
router.post('/user/login', userController.loginAction);

router.get('/user/register', userController.register);
router.post('/user/register', userController.registerAction);
router.get('/user/logout', userController.logout);

router.get('/user/profile', profileController.profile);
router.post('/user/profile', profileController.profileAction);

router.get('/store', storeController.market);
router.get('/forum', forumController.post);

router.get('/create-post', PostController.createPost);
router.post(
  '/create-post',
  imageMiddleware.upload,
  imageMiddleware.resize,
  PostController.createPostAction,
);

router.get('/create-post/:slug/edit', PostController.edit);
router.post(
  '/create-post/:slug/edit',
  imageMiddleware.upload,
  imageMiddleware.resize,
  PostController.editAction,
);

router.get('/forum/:slug', PostController.view);

module.exports = router;
