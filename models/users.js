const mongoose = require('mongoose');
const Campsite = require('./campsites');

const userSchema = mongoose.Schema({
	username: {type: String},
	password: {type: String},
	reviews: {type: String}
	photos: {type: String},
});

module.exports = mongoose.mdoel('User', userSchema);