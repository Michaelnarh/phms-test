const mongoose = require("mongoose");

const facilitySchema = mongoose.Schema({
	name: { type: String, required: [true, "Facility name required"] },
	number: { type: String, default: 0 },
	createdAt: { type: Date, default: Date.now() },
	updatedAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Facility", facilitySchema);
