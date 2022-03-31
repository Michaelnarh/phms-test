const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
	review: { type: String, required: [true, "Review cannot be empty"] },
	rating: { type: Number, max: 5, min: 1 },
	author: { type: String },
	residence: { type: mongoose.Schema.Types.ObjectId, ref: "Hostel" },
	createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Review", reviewSchema);
