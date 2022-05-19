const mongoose = require("mongoose");
const RegistrationTable = require("./registrationTable");
const RClass = require("./classModel");
const Reviews = require("./reviewModel");
const ResidenceFacility = require("./residenceFacilityTable");

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
		coordinates: { type: [], default: undefined },
		address: String,
		description: String,
	},
	distance: { type: String },
	directionLink: { type: String },
	roomsTotal: { type: Number },
	totalBedspaces: { type: Number },
	maleCapacity: { type: Number },
	femaleCapacity: { type: Number },
	registered: { type: Boolean },
	rClass: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
	addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // admin login route can only add hostel
	ratingAverage: {
		type: Number,
		default: 4.5,
		set: (val) => Math.round(val * 10) / 10,
	},
	ratingQuantity: { type: Number, default: 0 },
	createAt: { type: Date, default: Date.now() },
	updadtedAt: { type: Date, default: Date.now() },
});

residenceSchema.virtual("reviews", {
	ref: "Review",
	localField: "_id",
	foreignField: "residence",
	// count: true,
});
residenceSchema.set(
	"toJSON",
	{ virtuals: true } //ensure json populate
);
residenceSchema.set(
	"toObject",
	{ virtuals: true } //ensure to object populate
);

residenceSchema.index({ gpsAddress: "2dsphere" });

residenceSchema.plugin(uniqueValidator);

residenceSchema.pre("remove", function (next) {
	RegistrationTable.remove({ residence: this._id }, (err, data) => {
		console.log("got here");
		if (!err) {
			console.log(data);
		}
	});
	ResidenceFacility.remove({ residence: this._id }, (err, JSONstatus) => {
		console.log("got here 2", this?._id);
		if (!err) {
			console.log(JSONstatus);
		}
		if (err) {
			console.log(err);
		}
	});

	Reviews.updateMany({ $pull: { residence: this._id }, multi: true });
	next();
});
module.exports = mongoose.model("Residence", residenceSchema);
