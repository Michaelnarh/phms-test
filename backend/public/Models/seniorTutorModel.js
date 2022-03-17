const mongoose = require("mongoose");

const seniourTutorSchema = mongoose.Schema({
	name: { type: String, required: [true, "Name field is required"] },
	email: {
		type: String,
		required: [true, "Email field is required"],
		unique: true,
	},
	isCurrent: { type: Boolean, default: true },
	contact: { type: String },
	zone: { type: mongoose.Schema.Types.ObjectId, ref: "Zone" },
});
module.exports = mongoose.model("SeniorTutor", seniourTutorSchema);
