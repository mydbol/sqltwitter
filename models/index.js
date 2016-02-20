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
