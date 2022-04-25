const mongoose = require("mongoose");
const Residence = require("./residenceModel");
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

// let User = mongoose.model("User", userSchema);
Zone.exists({ name: "Ayeduase-North" }).then((result) => {
	if (!result) {
		Zone.create(
			{
				name: "Ayeduase-North",
			},

			function (err) {
				console.log(err);
			}
		);
	}
});
ZoneSchema.pre("remove", function (next) {
	Residence.remove({ zone: this._id });
	next();
});

module.exports = Zone;
