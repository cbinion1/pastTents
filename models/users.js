const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');

const Review = require('./reviews');

const userSchema = new mongoose.Schema({
	username: {type: String},
	googleId: {type: String},
	password: {type: String},
	displayName: {type: String},
	reviews: {type: String},
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);