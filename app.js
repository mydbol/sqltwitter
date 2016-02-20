var express = require('express');
var app = express();
var morgan = require('morgan');
var swig = require('swig');
var routes = require('./routes');
var bodyParser = require('body-parser');
var socketio = require('socket.io');

app.set('views', './views');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults({cache: false});

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var server = app.listen(3000, function() {
  console.log('listening on port 3000');
});

var io = socketio.listen(server);

app.use('/', routes(io));
app.use(express.static('./public'));
