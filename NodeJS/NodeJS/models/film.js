const mongoose = require('mongoose');

var Film = mongoose.model('Film', {
    name: { type: String },
    director: { type: String },
    date: { type: Date },
    duration: { type: Number }
});

module.exports = { Film };