const express = require("express");
const studentMPController = require("../Controllers/studentMPController");
const authController = require("../Controllers/authController");
const router = express.Router();

router
	.route("/")
	.get(authController.protected, studentMPController.getAllStudentMP)
	.post(
		authController.protected,
		authController.restrictTo(
			"admin",
			"maintainer",
			"superAdmin",
			"supervisor"
		),
		studentMPController.uploadImage,
		studentMPController.resizeImage,
		studentMPController.createStudentMP
	);

router
	.route("/:slug")
	.get(authController.protected, studentMPController.getStudentMP);
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
		studentMPController.uploadImage,
		studentMPController.resizeImage,
		studentMPController.updateStudentMP
	)
	.delete(
		authController.protected,
		authController.restrictTo("admin", "superAdmin", "supervisor"),
		studentMPController.deleteStudentMP
	);

module.exports = router;
