const mongooose = require("mongoose");
const { Schema } = require("mongoose");

const nssPersonnelSchema = mongooose.Schema({
	name: { type: String, required: [true, "Name field is required"] },
	email: {
		type: String,
		required: [true, "Email field is required"],
		unique: true,
	},
	isCurrent: { type: Boolean, default: true },
	slug: { type: String },
	contact: { type: String },
	tutor: { type: Schema.Types.ObjectId, ref: "SeniorTutor" },
	image: { type: String },
});

module.exports = mongooose.model("NSSPersonnel", nssPersonnelSchema);
