const Review = require("../Models/reviewModel");

//create new Review
exports.createReview = async (req, res) => {
	try {
		const newReview = await Review.create(req.body);
		res.status(201).json({
			status: "success",
			newReview,
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};

//update info on a Review
exports.updateReview = async (req, res) => {
	if (!req.params.id) {
		throw Error("Review  not identified");
	}
	try {
		const review = await Review.findByIdAndUpdate(req.params.id, req.body);
		res.status(201).json({
			status: "success",
			review,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};

// get ad particular Review
exports.getReview = async (req, res) => {
	try {
		const review = await Review.findById(req.params.id);
		res.status(200).json({
			status: "success",
			review,
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};

//get all Reviews

exports.getAllReviews = async (req, res) => {
	try {
		const reviews = await Review.find();

		res.status(200).json({
			status: "success",
			message: reviews,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};

//delete a Reviews
exports.deleteReview = async (req, res, next) => {
	try {
		const review_id = req.params.id;
		if (!review_id) throw new Error("Review id is required for this operation");
		const review = await Review.findById(review_id);
		await Review.findByIdAndDelete(review_id);
		res.status(200).json({
			status: "success",
			message: `Review records of  ${review.review} is deleted successfully`,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};
