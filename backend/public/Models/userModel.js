const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
	username: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	role: {
		type: String,
		enum: ["user", "maintainer", "supervisor", "admin"],
		default: "user",
	},
	password: { type: String, required: true, min: 8, select: false },
	passwordConfirm: { type: String, required: true, min: 8, select: false },
	passwordChangedAt: {
		type: Date,
		default: null,
	},
	passwordResetToken: { type: String, default: null },
	passwordExpiresAt: { type: Date, default: null },
	image: { type: String },
});
userSchema.plugin(uniqueValidator);

userSchema.pre("save", async function (next) {
	// console.log("on pre save");
	if (!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, 12);
	// this.passwordConfirm = undefined;
	next();
});
userSchema.methods.correctPassword = async (canPass, userPass) => {
	return await bcrypt.compare(canPass, userPass);
};

userSchema.methods.passwordChanged = async (jwtTimeStamp) => {
	if (this.passwordChangedAt) {
		const pwdChangeAtTime = await parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10
		);

		return pwdChangeAtTime > jwtTimeStamp;
	}

	return false;
};

let User = mongoose.model("User", userSchema);
User.exists({ email: "Admin@gmail.com" }).then((result) => {
	if (!result) {
		User.insertMany(
			[
				{
					username: "michael narh",
					email: "Admin@gmail.com",
					password: "micihaelnarh",
					passwordConfirm: "michaelnarh",
				},
				{
					username: "James Mensah",
					email: "maintainer@gmail.com",
					password: "drjames",
					passwordConfirm: "drjames",
				},
			],
			function (err) {
				console.log(err);
			}
		);
	}
});

module.exports = User;
