const mongoose = require("mongoose");

const facilitySchema = mongoose.Schema({
	name: { type: String, required: [true, "Facility name required"] },
	createdAt: { type: Date, default: Date.now() },
	updatedAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Facility", facilitySchema);
