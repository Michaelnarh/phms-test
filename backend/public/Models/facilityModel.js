const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const ResidenceFacilityTable = require("./residenceFacilityTable");
const Residence = require("./residenceModel");

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

facilitySchema.pre("remove", function (next) {
	ResidenceFacilityTable.remove({ facility: this._id });
	next();
});

module.exports = mongoose.model("Facility", facilitySchema);
