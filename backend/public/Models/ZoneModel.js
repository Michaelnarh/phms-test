const mongoose = require("mongoose");
const Residence = require("./residenceModel");
const Location = require("./locationModel");
const Tutor = require("./seniorTutorModel");
const AreaMp = require("./areaMPModel");
const uniqueValidator = require("mongoose-unique-validator");
const ZoneSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "Zone Name is required"],
		unique: [true, "This Zone name already Exist"],
	},
	createdAt: { type: Date, default: Date.now() },
	updatedAt: { type: Date, default: Date.now() },
	tutor: { type: mongoose.Schema.Types.ObjectId, ref: "SeniorTutor" },
});

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
	AreaMp.remove({ zone: this._id });
	next();
});

module.exports = Zone;
