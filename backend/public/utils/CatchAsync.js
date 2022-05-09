const AppError = require("./AppError");
const catchAsync = (req, res, next) => {
	try {
		return (req, res, next) => {
			next();
		};
	} catch (err) {
		next(AppError(err));
	}
};

module.exports = catchAsync;
