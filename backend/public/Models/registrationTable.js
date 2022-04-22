const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const registrationSchema = mongoose.Schema({
	residence: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Residence",
		required: true,
	},
	academicYear: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "AcademicYear",
		required: true,
	},
	status: { type: Number, default: 1 }, // 1=>registered 0=> not registered
	addedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	createdAt: { type: Date, default: Date.now() },
});

registrationSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Registraion", registrationSchema);
