const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes/index');
const pageNotFound = require('./404/pageNotFound');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const session = require('express-session');
const { middlewareGlobal } = require('./src/middlewares/global');
const cors = require('cors');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use(cookieParser(process.env.SECRET));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

const User = require('./src/models/User');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(middlewareGlobal);

app.use('/', routes);

app.use(pageNotFound.error404);
app.set('view engine', 'ejs');

module.exports = app;
