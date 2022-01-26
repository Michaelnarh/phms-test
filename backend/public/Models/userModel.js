const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
	username: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	role: {
		type: String,
		enum: ["user", "maintainer", "supervisor", "admin"],
		defualt: "user",
	},
	password: { type: String, required: true, min: 8 },
	passwordConfirm: { type: String, required: true, min: 8 },
	passwordChangedAt: {
		type: Date,
		default: null,
	},
	passwordResetToken: { type: String, default: null },
	passwordExpiresAt: { type: Date, default: null },
});
userSchema.plugin(uniqueValidator);

userSchema.pre("save", async function (next) {
	// console.log("on pre save");
	if (!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, 12);
	this.passwordConfirm = undefined;
	next();
});
userSchema.methods.correctPassword = async (canPass, userPass) => {
	return await bcrypt.compare(canPass, userPass);
};
module.exports = mongoose.model("User", userSchema);
