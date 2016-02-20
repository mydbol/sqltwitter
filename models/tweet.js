var Sequelize = require('sequelize');

mode.exports = function(db) {
  var Tweet = db.define('Tweet', {
    tweet: Sequelize.STRING
  }, {
    timestamps: false
  });

  return Tweet;
}
