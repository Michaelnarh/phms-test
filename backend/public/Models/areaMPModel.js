const mongooose = require("mongoose");
const { Schema } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const areaMpSchema = mongooose.Schema({
	name: { type: String, required: [true, "Name field is required"] },
	email: {
		type: String,
		required: [true, "Email field is required"],
		unique: true,
	},
	contact: { type: String },
	isCurrent: { type: Boolean, default: true },
	zone: { type: Schema.Types.ObjectId, ref: "Zone" },
	tutor: { type: Schema.Types.ObjectId, ref: "SeniorTutor" },
	image: { type: String },
	slug: { type: String },
});

areaMpSchema.plugin(uniqueValidator);
module.exports = mongooose.model("AreaMP", areaMpSchema);
