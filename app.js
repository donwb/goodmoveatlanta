var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config');

var app = express();

var apiController = require('./api-controller');

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
  console.log("in dev");
  port = process.env.PORT;
} else {
  console.log("in prod");
  port = config.production.EnvConfig.port;
}

app.get('/', function(req, res){
  res.sendfile(__dirname + '/public/index.html');
});

app.get('/data', function(req, res){
  res.sendfile(__dirname + '/public/js/data.json');
});

app.get('/buyer', function(req, res){
  res.sendfile(path.join(__dirname, '/public/buyer.html'));
});

app.get('/seller', function(req, res){
  res.sendfile(path.join(__dirname, '/public/seller.html'));
});

app.get('/contact', function(req, res){
  res.sendfile(path.join(__dirname, '/public/contact.html'));
});

app.get('/testimonials', function(req, res){
  res.sendfile(path.join(__dirname, '/public/testimonials.html'));
});



/*
 * API
 */

app.post('/api/sellerInfo', function(req, res){
  var postData = req.body;
  console.log(postData.FirstName);

  var mongoUrl = process.env.MONGO_URL;
  console.log(mongoUrl);

  var controller = new apiController(mongoUrl);

  controller.addSeller(postData, function(err, result){
    if(!err){
      res.send({
        "status": "ok"
      });
    } else {
      res.send({
        "status": "error"
      })
    }
    
  });
});

app.post('/api/buyerInfo', function(req, res){
  var postData = req.body;
  var mongoUrl = process.env.MONGO_URL;

  var controller = new apiController(mongoUrl);
  console.log(postData);

  controller.addBuyer(postData, function(err,result){
    if(!err){
      res.send({
        "status": "ok"
      });
    } else {
      res.send({
        "status": "error"
      })
    }
  })
})

console.log('config ' + port);
console.log('mongo: ' + process.env.MONGO_URL);
console.log('mail domain: ' + process.env.MG_DOMAIN);

http.createServer(app).listen(port, function(){
  console.log('Express server listening on port ' + port);
});
