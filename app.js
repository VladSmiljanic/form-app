const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./server/routes/index.js');
const expressValidator = require('express-validator');
const promisify = require('es6-promisify');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
// const session = require('cookie-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const cors = require('cors');

const User = mongoose.model('User');

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const app = express();


// webpack is cranky about some packages using a soon to be deprecated API. shhhhhhh
process.noDeprecation = true;

app.use(cors({credentials: true, 
              methods:['GET','POST'],
              origin: 'http://localhost:3000'}));
// app.use(express.static("public"));

app.use(expressValidator());

app.use(cookieParser());

app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

app.use((req, res, next) => {
  req.login = promisify(req.login,req);
  next();
});

app.use('/', routes);

module.exports = app;