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

            var totalTime = 0;

            console.log('Creating a new user!');
            _.each(req.user.games.games, function(el){
              totalTime += el.playtime_forever;
            })

            var totalTime = Math.round(totalTime/60);
            var elefgeeLevel = 1 + Math.floor(totalTime/100);

            var user = new User({
              userInfo: req.user._json,
              displayName: req.user.displayName,
              steamId: req.user.id,
              picture: req.user.photos[2].value,
              games: req.user.games,
              level: elefgeeLevel,
              posts: [],
              rating: 3,
              raters: ['user']
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
    });

    app.put('/addReview', function(req, res, next) {

      console.log('user req.body', req.body);

        User.find({steamId: req.body.steamId}, function(err, user) {

          user[0].raters.push(req.body.userObj.userReview);

          var newRating = (Number(user[0].rating) + req.body.userObj.stars) / user[0].raters.length;
          var updatedRating = Math.round(newRating);

          user[0].rating = updatedRating;

          user[0].save(function(err) {
             if(err) throw err;
             console.log('added review', user[0]);
           })

          res.send(user[0]);

        })
    });

    app.put('/deletePost', function(req, res, next){

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
