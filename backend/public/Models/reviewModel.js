const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  review: { type: String, required: [true, "Review cannot be empty"] },
  rating: { type: Number, max: 5, min: 1 },
  createdAt: { type: Date, default: Date.now() },
  hostel: { type: mongoose.Schema.Types.ObjectId, ref: "Hostel" },
  author: { type: String },
});

module.exports = mongoose.model("Review", reviewSchema);
