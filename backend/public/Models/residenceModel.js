const mongoose = require("mongoose");

const residenceSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "Hostel Name is required"],
		unique: true,
	},
	residenceType: { type: String, enum: ["Hostel", "Homestel", "Other"] },
	location: { type: String, required: [true, "Location field is required"] },
	description: { type: String },
	zone: { type: mongoose.Schema.Types.ObjectId, ref: "Zone" },
	managersName: {
		type: String,
	},
	digitalAddress: { type: String },
	managersContact: { type: String },
	ownersName: { type: String },
	ownersContact: { type: String },
	portersName: { name: { type: String }, portersContact: { type: String } },
	coverImage: { type: String },
	images: [{ type: String }],
	facilities: [{ type: String }],
	bookingLink: { type: String },
	gpsAddress: {
		type: { type: String, default: "Point", enum: ["Point"] },
		coordinates: [Number],
		address: String,
		description: String,
	},
	rating: { type: Number, max: 5, default: 3.2 },
	addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	distance: { type: String },
	capacity: { type: Number },
	maleCapacity: { type: Number },
	femaleCapacity: { type: Number },
	regDate: { type: Date },
	registered: { type: Boolean },
	createAt: { type: Date, default: Date.now() },
	updadtedAt: { type: Date },
});

residenceSchema.virtual("reviews", {
	foreignField: "residence ",
	localField: "_id",
});

residenceSchema.index({ gpsAddress: "2dsphere" });

module.exports = mongoose.model("Residence", residenceSchema);
