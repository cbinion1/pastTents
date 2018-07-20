const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/pastTents");

mongoose.connection.on("connected", () => {
	console.log("mongoose is connected")
});

mongoose.connection.on("error", () => {
	console.log("error! error!")
});

mongoose.connection.on("disconnected", () => {
	console.log("mongoose is disconnected")
});