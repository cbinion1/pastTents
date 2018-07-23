const mongoose = require('mongoose');
const Review = require('./reviews');

const userSchema = new mongoose.Schema({
	username: {type: String},
	password: {type: String},
	displayname: {type: String},
	reviews: [Review.schema],
});

module.exports = mongoose.model('User', userSchema);