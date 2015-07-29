var User = require('./models/User');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var _ = require('underscore');

module.exports = function(app, passport) {

    app.get('/', function(req, res){
      res.render('index', { user: req.user });
    });

    app.get('/auth/steam',
      passport.authenticate('steam', { failureRedirect: '/login' }),
      function(req, res) {
        res.redirect('/');
      });


    app.get('/auth/steam/return',
      passport.authenticate('steam', { failureRedirect: '/login' }),
      function(req, res, next) {
        console.log('user info from steam',req.user);

        _.each(req.user.games.games, function(el){
          el.pictureLink = "http://media.steampowered.com/steamcommunity/public/images/apps/" + el.appid + "/" + el.img_logo_url + ".jpg"
        });

        User.find({steamId: req.user.id}, function(err, user) {
          if (user.length !== 0) {
            console.log('Logging in as existing user!');
            res.redirect('#/feed')

          } else {
            console.log('Creating a new user!');
            var user = new User({
              userInfo: req.user._Json,
              displayName: req.user.displayName,
              steamId: req.user.id,
              picture: req.user.photos[2].value,
              games: req.user.games
            });

            console.log('User created!');

            user.save(function(err) {
              if(err) throw err;
              console.log('SAVED USER', user);

              res.redirect('#/feed');
            })

          }
        })

      });

    app.get('/user',
      function(req,res,next) {
        User.find(function(err,user) {
          res.send(user);
        });
    });

    app.get('/me', function (req, res, next) {
      res.send(req.user);
    })

    app.get('/feed', ensureAuthenticated, function(req, res){
      res.render('feed', { user: req.user });
    });

    app.get('/logout', function(req, res){
      req.logout();
      res.redirect('#/login');
    });

    function ensureAuthenticated(req, res, next) {
      if (req.isAuthenticated()) { return next(); }
      res.redirect('#/login');
    }

};
