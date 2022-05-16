const AppError = require("./AppError");
const catchAsync = (fn) => {
	return (req, res, next) => {
		next();
		fn = (req, res, next).catch((err) => next(AppError(err)));
	};
};

module.exports = catchAsync;
