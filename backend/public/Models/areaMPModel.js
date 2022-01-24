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
	zoneIds: [{ type: Schema.Types.ObjectId, ref: "Zone" }],
	image: { type: String },
});

module.exports = mongooose.model("MP", mpSchema);
