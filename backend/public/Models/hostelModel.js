const mongoose = require("mongoose");

const hostelSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Hostel Name is required"],
    unique: true,
  },
  location: { type: String, required: [true, "Location field is required"] },
  zoneId: { type: mongoose.Schema.Types.ObjectId, ref: "Zone" },
  manager: { type: String, required: [true, "Manager's name is required"] },
  porterName: [{ type: String }],
  contact: { type: String },
  coverImage: { type: String },
  images: [{ type: String }],
  bookingLink: { type: String },
  gpsAddress: {
    type: { type: String, default: "Point", enum: ["Point"] },
    coodinates: [Number],
    address: String,
    description: String,
  },
  ratingAverage: { type: Number, max: 5, default: 3.2 },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createAt: { type: Date, default: Date.now() },
  updadtedAt: { type: Date },
});

hostelSchema.virtual("reviews", {
  foreignField: "hostel",
  localField: "_id",
});

hostelSchema.index({ gpsAddress: "2dsphere" });

module.exports = mongoose.model("Hostel", hostelSchema);
