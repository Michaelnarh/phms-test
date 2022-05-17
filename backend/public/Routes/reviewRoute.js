const express = require("express");
const reviewController = require("../Controllers/reviewController");
const authController = require("../Controllers/authController");
const router = express.Router();

router
	.route("/")
	.post(reviewController.createReview)
	.get(reviewController.getAllReviews);

router
	.route("/:id")
	.get(reviewController.getReview)
	.patch(
		authController.protected,
		authController.restrictTo("supervisor", "admin", "superAdmin"),
		reviewController.updateReview
	)
	.delete(
		authController.protected,
		authController.restrictTo("supervisor", "admin", "superAdmin"),
		reviewController.deleteReview
	);

module.exports = router;
