var User = require('./models/User');
var mongoose = require('mongoose');



module.exports = function(app, passport) {

    app.get('/', function(req, res){
      res.render('index', { user: req.user });
    });

    app.get('/auth/steam',
      passport.authenticate('steam', { failureRedirect: '/login' }),
      function(req, res) {
        res.redirect('/');
      });

// What we worked on Jul 26. (Getting the data back from database)

    app.get('/auth/steam/return',
      passport.authenticate('steam', { failureRedirect: '/login' }),
      function(req, res, next) {
        console.log('user info from steam',req.user);


        // res.status(200).send(req.user);
        // res.redirect('/#/feed')

        User.find({steamId: req.user.id}, function(err, user) {
          if (user.length !== 0) {
            res.redirect('/#/feed')
          } else {
            var user = new User({
              displayName: req.user.displayName,
              steamId: req.user.id,
              picture: req.user.photos[2].value
            });

            user.save(function(err) {
              if(err) throw err;
              console.log("SAVED USER", user);
              res.redirect('/#/feed');
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

    app.get('/feed', ensureAuthenticated, function(req, res){
      res.render('feed', { user: req.user });
    });

    app.get('/logout', function(req, res){
      req.logout();
      res.redirect('/');
    });

    function ensureAuthenticated(req, res, next) {
      if (req.isAuthenticated()) { return next(); }
      res.redirect('/login')
    }

};
