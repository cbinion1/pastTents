const mongoose = require('mongoose');
const Campsite = require('./campsites');

const reviewSchema = new mongoose.Schema({
	location: [Campsite.schema],
	title: {type: String},
	body: {type: String},
	rating: Number,
	photos: [{type: String}],
});

module.exports = mongoose.model('Review', reviewSchema);