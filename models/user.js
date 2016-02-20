var Sequelize = require('sequelize');

module.export = function (db) {
  var User = db.define('User', {
    name: Sequelize.STRING,
    pictureUrl: Sequelize.STRING
  }, {
    timestamps: false
  });

  return User;
}
