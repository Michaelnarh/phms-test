const mongoose = require("mongoose");

const registrationSchema = mongoose.Schema({
	residence: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Residence",
		required: true,
	},
	year: { type: Number, required: true },
	status: { type: Number, default: 1 }, // 1=>registered 0=> not registered
	createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Registraion", registrationSchema);
