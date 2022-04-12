const mongoose = require("mongoose");

const registrationSchema = mongoose.Schema({
	residence: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Hostel",
		required: true,
	},
	year: { type: Number },
	status: { type: Number, default: 1 }, // 1=>registered 0=> regostered
	createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Registraion", registrationSchema);
