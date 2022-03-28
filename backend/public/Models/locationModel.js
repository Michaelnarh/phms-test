const mongoose = require("mongoose");

const LocationSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "Location Name is required"],
		unique: [true, "This Location name already Exist"],
	},
	zone: { type: mongoose.Schema.Types.ObjectId, ref: "Zone" },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Location", LocationSchema);
