const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

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

LocationSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Location", LocationSchema);
