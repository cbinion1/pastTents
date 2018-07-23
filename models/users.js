const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Review = require('./reviews');

const userSchema = new mongoose.Schema({
	username: {type: String},
	password: {type: String},
	displayname: {type: String},
	reviews: {type: String},
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);