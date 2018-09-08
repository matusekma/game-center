var express = require('express');
var app = express();

app.use(express.static('public'));
app.use(express.static('views'));
app.use(express.static('games'));

var server = app.listen(process.env.PORT || 5000, function(){

});