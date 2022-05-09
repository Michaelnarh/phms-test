const express = require("express");
const classController = require("../Controllers/classController");
const authController = require("../Controllers/authController");
const router = express.Router();

router
	.route("/")
	.get(authController.protected, classController.getAllClasses)
	.post(
		authController.protected,
		authController.restrictTo("admin", "superAdmin", "supervisor"),
		classController.createClass
	);
router
	.route("/:id")
	.get(authController.protected, classController.getClass)
	.patch(
		authController.protected,
		authController.restrictTo("admin", "superAdmin", "supervisor"),
		classController.updateClass
	)
	.delete(
		authController.protected,
		authController.restrictTo("admin", "superAdmin", "supervisor"),
		classController.deleteClass
	);

module.exports = router;
