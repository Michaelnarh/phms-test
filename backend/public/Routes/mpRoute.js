const express = require("express");
const mpController = require("../Controllers/mpController");
const authController = require("../Controllers/authController");
const router = express.Router();

router
	.route("/")
	.get(
		authController.protected,
		authController.restrictTo(
			"admin",
			"superAdmin",
			"supervisor",
			"maintainer"
		),
		mpController.getAllMPs
	)
	.post(
		authController.protected,
		authController.restrictTo(
			"admin",
			"superAdmin",
			"supervisor",
			"maintainer"
		),
		mpController.createMP
	);
router
	.route("/:id")
	.get(
		authController.protected,
		authController.restrictTo(
			"admin",
			"superAdmin",
			"supervisor",
			"maintainer"
		),
		mpController.getMP
	)
	.patch(
		authController.protected,
		authController.restrictTo(
			"admin",
			"superAdmin",
			"supervisor",
			"maintainer"
		),
		mpController.updateMP
	)
	.delete(
		authController.protected,
		authController.restrictTo("admin", "superAdmin"),
		mpController.deleteMP
	);

module.exports = router;
