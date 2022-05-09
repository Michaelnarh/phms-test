const express = require("express");
const areaMPController = require("../Controllers/areaMPController");
const authController = require("../Controllers/authController");
const router = express.Router();

router
	.route("/")
	.get(authController.protected, areaMPController.getAllAreaMP)
	.post(
		authController.protected,
		authController.restrictTo("admin", "superAdmin", "supervisor"),
		areaMPController.uploadImage,
		areaMPController.resizeImage,
		areaMPController.createAreaMP
	);

router
	.route("/:slug")
	.get(authController.protected, areaMPController.getAreaMP);
router
	.route("/:id")
	.patch(
		authController.protected,
		authController.restrictTo("admin", "superAdmin", "supervisor"),
		areaMPController.uploadImage,
		areaMPController.resizeImage,
		areaMPController.updateAreaMP
	)
	.delete(
		authController.protected,
		authController.restrictTo("admin", "superAdmin", "supervisor"),
		areaMPController.deleteAreaMP
	);

module.exports = router;
