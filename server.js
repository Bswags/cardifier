var http = require('http');
var url = require('url');
var express = require('express');

var app = express();

var server = http.server(app);

app.get('/hello.txt', function(req, res){
  var body = 'Hello World';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', Buffer.byteLength(body));
  res.end(body);
});

var port = process.env.PORT || 5000;
server.listen(port, function() {
  console.log("Listening on " + port);
}); 