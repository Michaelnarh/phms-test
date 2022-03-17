const mongoose = require("mongoose");

const ZoneSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "Zone Name is required"],
		unique: [true, "This Zone name already Exist"],
	},
	zone: { type: mongoose.Schema.Types.ObjectId, ref: "Zone" },
	createdAt: { type: Date, default: Date.now() },
	updatedAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Location", ZoneSchema);
