const mongoose = require("mongoose");

const hostelSchema = mongoose.Schema({
  name: { type: String, required: [true, "Zone Name is required"] },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Zone", hostelSchema);
