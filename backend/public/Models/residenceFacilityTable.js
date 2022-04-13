const mongoose = require("mongoose");

const residenceFacilitySchema = mongoose.Schema({
	facility: { type: mongoose.Schema.Types.ObjectId, ref: "Facility" },
	residence: { type: mongoose.Schema.Types.ObjectId, ref: "Residence" },
	count: { type: Number, default: 0 },
});

module.exports = mongoose.model(
	"ResideceFacilityTable",
	residenceFacilitySchema
);
