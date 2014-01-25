var http = require('http');
var url = require('url');
var express = require('express');

var makeCard = require('./routes/makeCard');
var shareCard = require('./routes/shareCard');

var app = express();

app.configure(function () {
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res){
  res.render('index.html');
  res.end();
});

app.get('/new/birthday', makeCard.birthday);
app.get('/new/valentine', makeCard.valentine);
app.get('/new/wedding', makeCard.wedding);

app.get('/share', function(req, res){
  var body = 'Sharing your card';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', Buffer.byteLength(body));
  res.end(body);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
}); 