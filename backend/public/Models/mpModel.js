const mongooose = require("mongoose");
const { Schema } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const mpSchema = mongooose.Schema({
	name: { type: String, required: [true, "Name field is required"] },
	email: {
		type: String,
		required: [true, "Email field is required"],
		unique: true,
	},
	contact: { type: String },
	isCurrent: { type: Boolean, default: true },
	image: { type: String },
});

mpSchema.plugin(uniqueValidator);
module.exports = mongooose.model("MP", mpSchema);
