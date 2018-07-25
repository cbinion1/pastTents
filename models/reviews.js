const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
	location: {type: String},
	body: {type: String},
	rating: Number,
	photos: [{type: String}],
});

module.exports = mongoose.model('Review', reviewSchema);