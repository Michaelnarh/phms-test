const mongooose = require("mongoose");
const slugify = require("slugify");
const uniqueValidator = require("mongoose-unique-validator");

const assembyMemSchema = mongooose.Schema({
	name: { type: String, required: [true, "Name field is required"] },
	email: {
		type: String,
		required: [true, "Email field is required"],
		unique: true,
	},
	contact: { type: String },
	academicYear: { type: String },
	slug: { type: String },
	isCurrent: { type: Boolean, default: true },
	image: { type: String },
});

assembyMemSchema.plugin(uniqueValidator);
assembyMemSchema.pre("save", function (next) {
	this.slug = slugify(this.name, { lower: true });
	next();
});
module.exports = mongooose.model("AssemblyMember", assembyMemSchema);
