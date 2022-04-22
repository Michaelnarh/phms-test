const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const ZoneSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "Zone Name is required"],
		unique: [true, "This Zone name already Exist"],
	},
	createdAt: { type: Date, default: Date.now() },
	updatedAt: { type: Date, default: Date.now() },
	tutor: { type: mongoose.Schema.Types.ObjectId, ref: "SeniorTutor" },
});

ZoneSchema.plugin(uniqueValidator);


module.exports = mongoose.model("Zone", ZoneSchema);
