var router = require('express').Router();
module.exports = function(io) {
  router.get('/', function(req, res) {
    io.emit('a')
    res.json({'name':'John'})

  });





  return router;
};
