var express = require('express');
var app = express();

app.use(express.static('public'));
app.use(express.static('views'));
app.use(express.static('games'));

var server = app.listen(3000, function(){

});