var http = require('http');
var url = require('url');
var express = require('express');

var makeCard = require('./routes/makeCard');
var shareCard = require('./routes/shareCard');

var app = express();

var server = http.server(app);

app.get('/hello', function(req, res){
  var body = 'Hello World';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', Buffer.byteLength(body));
  res.end(body);
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
server.listen(port, function() {
  console.log("Listening on " + port);
}); 