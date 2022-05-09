const express = require("express");
const nssPController = require("../Controllers/nssPController");
const authController = require("../Controllers/authController");
const router = express.Router();

router
	.route("/")
	.get(authController.protected, nssPController.getAllNSSPersonnel)
	.post(
		authController.protected,
		authController.restrictTo(
			"admin",
			"superAdmin",
			"maintainer",
			"supervisor"
		),
		nssPController.uploadImage,
		nssPController.resizeImage,
		nssPController.createNSSPersonnel
	);

router
	.route("/:slug")
	.get(authController.protected, nssPController.getNSSPersonnel);
router
	.route("/:id")
	.patch(
		authController.protected,
		authController.restrictTo(
			"admin",
			"superAdmin",
			"maintainer",
			"supervisor",
			"maintainer"
		),
		nssPController.uploadImage,
		nssPController.resizeImage,
		nssPController.updateNSSPersonel
	)
	.delete(
		authController.protected,
		authController.restrictTo(
			"admin",
			"superAdmin",
			"supervisor",
			"maintainer"
		),
		nssPController.deleteNSSPersonnel
	);

module.exports = router;
