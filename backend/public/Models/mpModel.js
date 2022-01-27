const mongooose = require("mongoose");
const { Schema } = require("mongoose");

const mpSchema = mongooose.Schema({
	name: { type: String, required: [true, "Name field is required"] },
	email: {
		type: String,
		required: [true, "Email field is required"],
		unique: true,
	},
	contact: { type: String },
	zones: [{ type: Schema.Types.ObjectId, ref: "Zone" }],
	sTutors: [{ type: Schema.Types.ObjectId, ref: "SeniorTutor" }],
	image: { type: String },
});

module.exports = mongooose.model("MP", mpSchema);
