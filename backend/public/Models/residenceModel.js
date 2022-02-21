const mongoose = require("mongoose");

const residenceSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "Hostel Name is required"],
		unique: true,
	},
	residenceType: { type: String, enum: ["Hostel", "Homestel", "Other"] },
	location: { type: String, required: [true, "Location field is required"] },
	zone: { type: mongoose.Schema.Types.ObjectId, ref: "Zone" },
	managerName: { type: String, required: [true, "Manager's name is required"] },
	managerContact: { type: String },
	porter: { name: { type: String }, contact: { type: String } },
	coverImage: { type: String },

	images: [{ type: String }],
	facilities: [{ type: String }],
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

residenceSchema.virtual("reviews", {
	foreignField: "residence ",
	localField: "_id",
});

residenceSchema.index({ gpsAddress: "2dsphere" });

module.exports = mongoose.model("Residence", residenceSchema);
