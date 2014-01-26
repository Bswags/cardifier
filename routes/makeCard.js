var url = require('url');
var ejs = require('ejs');
var fs = require('fs');
var Flickr = require('node-flickr');

exports.makeCard = function(req, res) {

	var parsed = url.parse(req.url, true);
	var type = parsed.query.cardkind;
	var to = parsed.query.tofield;
	var from = parsed.query.fromfield;
	var text = "";
	var picUrl = "";

	// get pic from flickr
	var keys = {'api_key': 'a6ad77fced459c630484f92dbb312bc8'};
	flickr = new Flickr(keys);

	flickr.get("photos.search", {"tags": "chocolate", 
								 "is_commons": true,
								 "per_page": 20,
								 "extras" : "url_m" }, function(result) {
		var numPics = result.photos.photo.length;
		var randPic = Math.floor(Math.random()*numPics);
		picUrl = result.photos.photo[randPic].url_m;
		console.log(picUrl);

		// pick random photo

		// pick random sonnet lines
		var sonnet = Math.floor((Math.random()*10)+1).toString();
		var sonnetPath = 'sonnets/' + sonnet;
		fs.readFile(sonnetPath, function(err, data) {
			if (err) console.log('error!');
			else {
				var lines = data.toString().split('\n');
				var numLines = lines.length;
				var startLine = Math.floor(Math.random()*(numLines-4));
				var text = "";
				for (i = startLine; i < startLine + 4; i++) {
					text = text + lines[i] + '\n';
				}
				console.log(text);
				res.render('card.ejs', {cardText: text,
										dear: to,
										love: from,
										imSrc: picUrl});
			}
		});

	});


	// render html with ejs
	//var template = null;
	//fs.readFile('cardTemplate.ejs', function(err, data) {
	//	if (!err) template = data;
	//});

	// send back response with rendered file
	//res.end(ejs.render(template));

	//res.render('card.html');


};