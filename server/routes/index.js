const express = require('express');
const router = express.Router();
const passport = require('passport');

const mainController = require('../controllers/mainController');

router.get('/', mainController.isLoggedIn,
          mainController.getInfo);

router.get('/poop', mainController.poop);

router.get('/logout', mainController.logout);

router.post('/register', mainController.registerUser);

// router.post('/login', mainController.login);

router.post('/login',
              passport.authenticate('local'),
              function(req,res){
                console.log(req.session);
                res.send(req.session);
              }
            );

module.exports = router;