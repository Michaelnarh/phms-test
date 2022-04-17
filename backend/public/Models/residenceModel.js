const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
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
	class: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
	addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	createAt: { type: Date, default: Date.now() },
	updadtedAt: { type: Date },
});

residenceSchema.plugin(uniqueValidator);
residenceSchema.virtual(
	"reviews",
	{
		localField: "_id",
		foreignField: "residence ",
		count: true,
	},
	{
		toJSON: { virtuals: true }, //ensure json populate
		toObject: { virtuals: true }, //ensure to object populate
	}
);

residenceSchema.index({ gpsAddress: "2dsphere" });

module.exports = mongoose.model("Residence", residenceSchema);
