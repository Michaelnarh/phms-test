const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const facilitySchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "Facility name required"],
		unique: true,
	},
	description: { type: String },
	createdAt: { type: Date, default: Date.now() },
	updatedAt: { type: Date, default: Date.now() },
});
facilitySchema.plugin(uniqueValidator);

module.exports = mongoose.model("Facility", facilitySchema);
