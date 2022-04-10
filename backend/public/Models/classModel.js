const mongoose = require("mongoose");

const classSchema = mongoose.Schema({
	name: { type: String, required: [true, "Residence Class name required"] },
	description: { type: String },
	priceRange: { type: String },
	createdAt: { type: Date, default: Date.now() },
	updatedAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Class", classSchema);
