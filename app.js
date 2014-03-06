var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config');

var app = express();

// all environments
//app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

var port;
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  port = config.development.EnvConfig.port;
} else {
  port = config.production.EnvConfig.port;
}

app.get('/', function(req, res){
  res.sendfile('public/index.html');
});

console.log('config ' + port);

http.createServer(app).listen(port, function(){
  console.log('Express server listening on port ' + port);
});
