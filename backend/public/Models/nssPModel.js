const mongooose = require("mongoose");
const { Schema } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

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

nssPersonnelSchema.plugin(uniqueValidator);
module.exports = mongooose.model("NSSPersonnel", nssPersonnelSchema);
