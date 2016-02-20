var Sequelize = require('sequelize');

var twitterjsDB = new Sequelize('twitterjs', 'root', null, {
  dialect: "mysql",
  host: 'localhost',
  port: 3306
});

twitterjsDB
  .authenticate()
  .catch(function(err) {
    console.error('Unable to connect to db: ', err);
  })
  .then(function() {
    console.log('Connection established');
  });


var Tweet = require('./tweet')(twitterjsDB);
var User = require('./user')(twitterjsDB);
User.hasMany(Tweet);
Tweet.belongsTo(User);

module.exports = {
  User: User,
  Tweet: Tweet
};


// User.findOne()
// .then(function (user) {
//     // produces expected output. wat.
//     console.log(user.name);
// });


// User.findOne()
// .then(function (user) {
//     // big old crazy object, but no name or
//     // id anywhere in there
//     console.log(user);
// });


// User.findOne().then(function (user) {
//     return user.getTweets();
// })
// .then(function (tweets) {
//     JSON.stringify(tweets); // another way of just logging the plain old values
// });

// User.findOne().then(function (user) {
//     console.log(user.get({plain: true}))
// });

// User.findOne().then(function (user) {
//     console.log(user.dataValues);
// });
