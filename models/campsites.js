const mongoose = require('mongoose');
const Review = require('./reviews');

const campsiteSchema = new mongoose.Schema({
	location: {type: String},
	overview: {type: String},
	details: {type: String},
	rv_sites: Boolean,
	tent_sites: Boolean,
	fire_rings: Boolean,
	pets_allowed: Boolean,
	drinking_water: Boolean,
	toilets: Boolean,
	zombies: Boolean,
	reviews: [Review.schema],
});

module.exports = mongoose.model('Campsite', campsiteSchema);