const express = require("express");
const assemblyMemController = require("../Controllers/assemblyMemController");
const authController = require("../Controllers/authController");
const router = express.Router();

router
	.route("/")
	.get(authController.protected, assemblyMemController.getAllAssemblyMem)
	.post(
		authController.protected,
		authController.restrictTo(
			"admin",
			"maintainer",
			"superAdmin",
			"supervisor"
		),
		assemblyMemController.uploadImage,
		assemblyMemController.resizeImage,
		assemblyMemController.createAssemblyMem
	);

router
	.route("/:slug")
	.get(authController.protected, assemblyMemController.getAssemblyMem);
router
	.route("/:id")
	.patch(
		authController.protected,
		authController.restrictTo(
			"admin",
			"maintainer",
			"superAdmin",
			"supervisor"
		),
		assemblyMemController.uploadImage,
		assemblyMemController.resizeImage,
		assemblyMemController.updateAssemblyMem
	)
	.delete(
		authController.protected,
		authController.restrictTo("admin", "superAdmin", "supervisor"),
		assemblyMemController.deleteAssemblyMem
	);

module.exports = router;
