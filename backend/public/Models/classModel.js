const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Residence = require("./residenceModel");

const classSchema = mongoose.Schema({
	name: { type: String, required: [true, "Residence Class name required"] },
	description: { type: String },
	category: {
		fourInOne: { type: String },
		threeInOne: {
			type: String,
		},
		twoInOne: {
			type: String,
		},
		oneInOne: {
			type: String,
		},
	},
	createdAt: { type: Date, default: Date.now() },
	updatedAt: { type: Date, default: Date.now() },
});

classSchema.plugin(uniqueValidator);

classSchema.pre("remove", function (next) {
	Residence.remove({ rClass: this._id });
	next();
});
module.exports = mongoose.model("Class", classSchema);
