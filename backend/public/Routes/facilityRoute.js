const express = require("express");
const facilityController = require("../Controllers/facilityController");
const authController = require("../Controllers/authController");
const router = express.Router();

router
	.route("/")
	.get(authController.protected, facilityController.getAllFacilities)
	.post(
		authController.protected,
		authController.restrictTo("admin", "maitainer", "superAdmin", "supervisor"),
		facilityController.createFacility
	);
router
	.route("/:id")
	.get(
		authController.protected,
		authController.restrictTo(
			"admin",
			"maintainer",
			"superAdmin",
			"supervisor"
		),
		facilityController.getFacility
	)
	.patch(
		authController.protected,
		authController.restrictTo(
			"admin",
			"superAdmin",
			"maintainer",
			"supervisor"
		),
		facilityController.updateFacility
	)
	.delete(
		authController.protected,
		authController.restrictTo("admin", "superAdmin", "supervisor"),
		facilityController.deleteFacility
	);

module.exports = router;
