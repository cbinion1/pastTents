const mongoose = require('mongoose');
const Review = require('./reviews');

const campsiteSchema = new mongoose.Schema({
	location: {type: String},
	overview: {type: String},
	details: {type: String},
	rv_sites: {type: String},
	tent_sites: {type: String},
	fire_rings: {type: String},
	pets_allowed: {type: String},
	drinking_water: {type: String},
	toilets: {type: String},
	reviews: [Review.schema],
	photos: [],
});

module.exports = mongoose.model('Campsite', campsiteSchema);