var express = require('express');
var serveStatic = require('serve-static');

var app = express();

app.use(express.static('public'));
app.use(express.static('bower_components'));
app.listen(8080);
