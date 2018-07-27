const mongoose = require("mongoose");

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/pastTents';
mongoose.connect(mongoUri);

mongoose.connection.on("connected", () => {
	console.log("mongoose is connected")
});

mongoose.connection.on("error", () => {
	console.log("error! error!")
});

mongoose.connection.on("disconnected", () => {
	console.log("mongoose is disconnected")
});