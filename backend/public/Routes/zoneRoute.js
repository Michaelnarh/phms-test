const express = require("express");
const zoneController = require("../Controllers/zoneController");
const authController = require("../Controllers/authController");
const router = express.Router();

router
	.route("/")
	.post(
		authController.protected,
		authController.restrictTo("admin", "superAdmin", "supervisor"),
		zoneController.createZone
	)
	.get(
		authController.protected,
		authController.restrictTo(
			"admin",
			"maintainer",
			"superAdmin",
			"supervisor"
		),
		zoneController.getAllZones
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
		zoneController.getZone
	)
	.patch(
		authController.protected,
		authController.restrictTo("admin", "superAdmin", "supervisor"),
		zoneController.updateZone
	)
	.delete(
		authController.protected,
		authController.restrictTo("admin", "superAdmin"),
		zoneController.deleteZone
	);

module.exports = router;
