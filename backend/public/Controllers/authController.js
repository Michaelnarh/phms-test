const { promisify } = require("util");
const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const SignInToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};
const cookieOptions = {
	expires: new Date(Date.now + process.env.JWT_EXPIRES_IN * 24 * 3600 * 1000),
	// secure: true
	httpOnly: true,
};
exports.SignUp = async (req, res) => {
	try {
		const newUser = await User.create(req.body);

		const token = SignInToken(newUser._id);

		newUser.save();

		const user = newUser.toObject();

		delete user.password;
		delete user.passwordConfirm;
		res.cookie("jwt", token, cookieOptions);
		res.status(201).json({
			status: "success",
			user: user,
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

		if (!email || !password) {
			throw Error("input Email and  password");
		}

		const user = await User.findOne({ email }).select("+password");
		let correct;
		if (user) {
			correct = await user.correctPassword(password, user.password);
		}

		if (!user || !correct) {
			throw Error("Incorrect Email or Password ");
		}
		//signin token by the user
		const token = SignInToken(user._id);
		const u = user.toObject();
		delete u.password;
		res.cookie("jwt", token, cookieOptions);

		res.status(200).json({
			status: "success",
			user: u,
			token,
		});
	} catch (err) {
		res.status(500).json({
			status: "failed",
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
	} else if (req.cookies.jwt) {
		token = req.cookies.jwt;
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
		// next(new AppError("You are not permitted for this operation", 401));
	};
};

exports.getAllUsers = async (req, res) => {
	const users = await User.find();
	res.status(200).json({
		status: "success",
		users,
	});
};
exports.getUser = async (req, res) => {
	const user = await User.findById(req.params.id);
	res.status(200).json({
		status: "success",
		user,
	});
};
