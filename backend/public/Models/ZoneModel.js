const mongoose = require("mongoose");
const Residence = require("./residenceModel");
const Location = require("./locationModel");
const Tutor = require("./seniorTutorModel");
const StudentMp = require("./studentMPModel");
const uniqueValidator = require("mongoose-unique-validator");
const ZoneSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "Zone Name is required"],
		unique: [true, "This Zone name already Exist"],
	},
	createdAt: { type: Date, default: Date.now() },
	updatedAt: { type: Date, default: Date.now() },
	tutor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "SeniorTutor",
		unique: [true, "Only one tutor should be assigned to a zone"],
	},
});
ZoneSchema.index({ tutor: 1 }, { unique: true });
ZoneSchema.plugin(uniqueValidator);

let Zone = mongoose.model("Zone", ZoneSchema);

Zone.exists({ name: "Ayeduase-North" }).then((result) => {
	if (!result) {
		Zone.insertMany([
			{
				name: "Ayeduase-North",
			},
			{
				name: "Ayeduase-South",
			},
			{
				name: "Kotei-Gyinyase",
			},
			{
				name: "Newsite-Boadi-Emena",
			},
			{
				name: "Bomso-Ahinsan",
			},
			{
				name: "Gaza-Kentikrono",
			},
		])
			.then({})
			.catch((e) => {
				console.log(e);
			});
	}
});

ZoneSchema.pre("remove", function (next) {
	Residence.remove({ zone: this._id });
	Location.remove({ zone: this._id });
	Tutor.remove({ zone: this._id });
	StudentMp.remove({ zone: this._id });
	next();
});

module.exports = Zone;
