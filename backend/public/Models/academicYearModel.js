const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Registration = require("./registrationTable");
const slugify = require("slugify");

const academicYearSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	years: { type: String, required: true },
	slug: { type: String, unique: true },
	createdAt: { type: Date, default: Date.now() },
	updatedAt: { type: Date, default: Date.now() },
});

academicYearSchema.plugin(uniqueValidator);

academicYearSchema.pre("save", async function (next) {
	this.slug = slugify(this.name, { lower: true });
	next();
});

academicYearSchema.pre("remove", function () {
	Registration.remove({ academicYear: this._id });
});

module.exports = mongoose.model("AcademicYear", academicYearSchema);
