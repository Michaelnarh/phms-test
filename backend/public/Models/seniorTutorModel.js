const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const seniourTutorSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name field is required"],
		unique: true,
	},
	email: {
		type: String,
		required: [true, "Email field is required"],
		unique: true,
	},
	isCurrent: { type: Boolean, default: true },
	contact: { type: String },
	image: { type: String },
	slug: { type: String },
	zone: { type: mongoose.Schema.Types.ObjectId, ref: "Zone" },
});
seniourTutorSchema.plugin(uniqueValidator);
module.exports = mongoose.model("SeniorTutor", seniourTutorSchema);
