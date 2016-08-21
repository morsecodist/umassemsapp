var express = require('express');
var serveStatic = require('serve-static');

var app = express();

var port = 8080;

app.use(express.static('public'));
app.use(express.static('bower_components'));
app.listen(port, function(){console.log('Listening on port: ', port);});
