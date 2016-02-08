var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: String,
    color: String,
    url: String,
    category: String
    }, {
        collection: 'sounds'
    });

var Activities = mongoose.model('sounds', schema);

module.exports = Activities;