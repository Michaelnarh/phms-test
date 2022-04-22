const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const slugify = require("slugify");

const academicYearSchema = mongoose.Schema({
	name: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Residence",
		required: true,
		unique: [true, "Academic year must be unique"],
	},
	years: { type: String, required: true },
	slug: { type: String },
	createdAt: { type: Date, default: Date.now() },
	updatedAt: { type: Date, default: Date.now() },
});

academicYearSchema.plugin(uniqueValidator);

academicYearSchema.pre("save", async function (next) {
	this.slug = slugify(this.name, { lower: true });
});

module.exports = mongoose.model("AcademicYear", academicYearSchema);
