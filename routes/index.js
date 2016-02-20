var router = require('express').Router();
var db = require('../models')
var User = require('../models').User;
var Tweet = require('../models').Tweet;
module.exports = function(io) {

  router.get('/', function(req, res) {
    // return all users and tweets
    User.findAll({
        include: [{
          model: Tweet
        }]
      })
      .then(function(users) {
        res.json(users) // another way of just logging the plain old values
      });
  });
  router.get('/users', function(req, res) {
    // return all users and number of tweets for that user
    User.findAll('name', 'count(db.Tweet)', {
        include: [{
          model: Tweet
        }]
      })
      .then(function(users) {
        res.json({
          'name': users,
          'tweetCount': 12
        })
      })
  })
  router.get('/users/:userId', function(req, res) {
    // return user and users tweets
    User.findOne({
        include: [{
          model: Tweet
        }],
        where: {
          id: req.params.userId
        }
      })
      .then(function(user) {
        res.json(user)
      })
  })
  router.get('/tweets/:tweetId', function(req, res) {
    // return specific tweet and user
    Tweet.findOne({
      include: [{
        model: User
      }],
      where: {
        id: req.params.tweetId
      }
    }).then(function(tweet) {
      res.json(tweet)
    })
  })
  router.delete('/tweets/:tweetId', function(req, res) {

  });
  router.post('/tweet', function(req, res) {
    User.find({
        where: {
          name: req.body.name
        }
      })
      .then(function(user) {
        if (user)
          return user;
      })
      .then(function(user) {
        Tweet.create({
          tweet: req.body.tweet,
          UserId: user.id
        })
      })
      .then(function(tweet) {
        return res.redirect('/tweets/${tweet.id}');
      })
  })

  return router;
};
