const mongoose = require("mongoose");

const residenceSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "Hostel Name is required"],
		unique: true,
	},
	residenceType: { type: String, enum: ["Hostel", "Homestel", "Other"] },
	location: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
	slug: { type: String },
	description: { type: String },
	managersName: {
		type: String,
	},
	digitalAddress: { type: String },
	managersContact: { type: String },
	ownersName: { type: String },
	ownersContact: { type: String },
	portersName: { type: String },
	portersContact: { type: String },
	coverImage: { type: String },
	images: [{ type: String }],
	facilities: [{ type: Object }],
	bookingLink: { type: String },
	gpsAddress: {
		type: { type: String, default: "Point", enum: ["Point"] },
		coordinates: [Number],
		address: String,
		description: String,
	},
	rating: { type: Number, max: 5, default: 3.2 },
	distance: { type: String },
	roomsTotal: { type: Number },
	totalBedspaces: { type: Number },
	maleCapacity: { type: Number },
	femaleCapacity: { type: Number },
	regDate: { type: Date },
	registered: { type: Boolean },
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
