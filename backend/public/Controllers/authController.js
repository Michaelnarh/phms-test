const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");

const SignInToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

exports.SignUp = async (req, res) => {
	try {
		const { username, email, password, passwordConfirm } = req.body;

		const newUser = await User.create({
			email,
			username,
			password,
			passwordConfirm,
		});

		// console.log(newUser);

		const token = SignInToken(newUser._id);

		newUser.save();

		res.status(201).json({
			status: "success",
			user: newUser,
			token,
		});
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
};

exports.LogIn = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email: email });

		if (!user || !password) {
			throw Error("input Email and  password");
		}
		const correct = await user.correctPassword(password, user.password);

		if (!user || !correct) {
			throw Error("Email or Passord donot match");
		}
		//signin token by the user
		const token = SignInToken(user._id);

		res.status(200).json({
			status: "success",
			user,
			token,
		});
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
};

exports.forgotPassword = (req, res) => {};

exports.resetPassword = (req, res) => {};

//.........................................................//
//..........definition of Restriction and protection.......//
//.........................................................//

exports.protected = async (req, res, next) => {
	console.log(req.headers);
	let token;
	try {
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith("Bearer")
		) {
			// console.log(true);

			token = await req.headers.authorization.split(" ")[1];
			// console.log(token);
			//verify jwt token
		}

		if (!token) {
			//   throw new typeError("Access denied");
		}
	} catch (err) {
		res.status(404).json({
			status: "failed",
			message: err.message,
		});
	}
};
