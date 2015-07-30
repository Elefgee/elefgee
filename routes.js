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
          el.pictureLink = "http://media.steampowered.com/steamcommunity/public/images/apps/" + el.appid + "/" + el.img_logo_url + ".jpg";
          el.iconLink = "http://media.steampowered.com/steamcommunity/public/images/apps/" + el.appid + "/" + el.img_icon_url + ".jpg";
        });

        User.find({steamId: req.user.id}, function(err, user) {
          if (user.length !== 0) {
            console.log('Logging in as existing user!');
            res.redirect('#/feed')

          } else {
            console.log('Creating a new user!');
            var user = new User({
              userInfo: req.user._json,
              displayName: req.user.displayName,
              steamId: req.user.id,
              picture: req.user.photos[2].value,
              games: req.user.games,
              posts: []
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

    app.put('/deletePost', function(req, res, next){
      console.log(req.body);

      User.find({steamId: req.body.userData.id}, function(err, user) {

        var post = _.findWhere(user[0].posts, {timestamp: req.body.timestamp, text: req.body.text});
        var updatedPosts = _.without(user[0].posts, post);
        user[0].posts = updatedPosts;

        user[0].save(function(err) {
           if(err) throw err;
           console.log('Deleted this post', user);
         })

        res.send(user[0]);

      });

      //splice index of Object sent to database.
    })


    app.put('/posts', function(req, res, next){  // Look for user with id, push object to 'posts' array, Save the user data
      console.log('Body',req.body);

      User.find({steamId: req.body.userData.id}, function(err, user) {
        console.log('I am the posts!', user[0].posts)

        user[0].posts.push(req.body);

        user[0].save(function(err) {
           if(err) throw err;
           console.log('Added posts', user);
         })

        res.send(user[0]);
      });

    });

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
