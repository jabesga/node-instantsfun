var express = require('express');
var app = express();
var port = process.env.PORT || '3000';
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Instantsfun');

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

var site = require('./app/site');

app.get('/', site.index);
app.get('/import', site.import_csv);
app.get(/\/(.+)/, site.filter);

// Initialize server
if (!module.parent) {
    app.listen(port);
    console.log('\tListening on port ' + port);
}

