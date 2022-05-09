const express = require("express");
const LocationController = require("../Controllers/locationController");
const authController = require("../Controllers/authController");
const router = express.Router();

router
	.route("/")
	.post(
		authController.protected,
		authController.restrictTo(
			"admin",
			"superAdmin",
			"maintainer",
			"supervisor"
		),
		LocationController.createLocation
	)
	.get(
		authController.protected,
		authController.restrictTo(
			"admin",
			"superAdmin",
			"maintainer",
			"supervisor"
		),
		LocationController.getAllLocations
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
		LocationController.getlocation
	)
	.patch(
		authController.protected,
		authController.restrictTo(
			"admin",
			"superAdmin",
			"supervisor",
			"maintainer"
		),
		LocationController.updateLocation
	)
	.delete(
		authController.protected,
		authController.restrictTo("admin", "superAdmin"),
		LocationController.deleteLocation
	);

module.exports = router;
