const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');
const passport = require('passport');

exports.isLoggedIn = (req, res, next) => {
  //check if user is authenticated
  if(req.isAuthenticated()){ //method from passport
    console.log('Authenticated!')
    next();
    return;
  }
  console.log('Not...')
};

exports.poop = (req,res) => {
  res.send('here is some poop');
  console.log(req.session);
};

exports.getInfo = (req,res) => {
  console.log(req.user);
  res.send(req.user);
};

exports.registerUser = async (req, res) => {
  const email = req.body.login.email;
  const user = new User({email});
  const register = promisify(User.register, User); //We need a promise the method .register and the bind to what method is being passed
  await register(user, req.body.login.password); //.register hashes password.
};

exports.logout = (req,res) => {
  req.logout();
  console.log(req.session);
}

// exports.login = passport.authenticate('local', {
//   failureRedirect: '/poop',
//   failureFlash: 'Failed Login!',
//   successRedirect: '/',
//   successFlash: 'You are now logged in!'
// });
