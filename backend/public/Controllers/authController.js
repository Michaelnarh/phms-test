const { promisify } = require("util");
const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const SignInToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

exports.SignUp = async (req, res) => {
	try {
		const newUser = await User.create(req.body);

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

		const user = await User.findOne({ email }).select("+password");

		if (!user || !password) {
			throw Error("input Email and  password");
		}
		const correct = await user.correctPassword(password, user.password);

		if (!user || !correct) {
			throw Error("Incorrect Email or Password ");
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
	let currentUser;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		console.log(req.headers.authorization);

		token = req.headers.authorization.split(" ")[1];

		//verify jwt token
	}
	if (!token) {
		return next(new AppError("Acess Denied", 401));
	}
	//verify token
	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
	console.log(decoded);

	currentUser = await User.findById(decoded.id);
	if (!currentUser) {
		return next(new AppError("You are not logged in", 400));
	}

	//check if the password has been change ?
	if (currentUser.passwordChanged(decoded.iat)) {
		return next(
			"err"
			// new AppError("Password has recently been changed, log in again", 400)
		);
	}

	req.user = currentUser;

	next();
};

exports.restrictTo = (...roles) => {
	return (req, res, next) => {
		if (roles.includes(req.user)) {
			next();
		}
		next(new AppError("You are not permitted for this operation", 401));
	};
};

exports.getAllUsers = async (req, res) => {
	const users = await User.find();
	res.status(200).json({
		status: "success",
		users,
	});
};
