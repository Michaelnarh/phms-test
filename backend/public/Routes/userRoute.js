const express = require("express");
const authController = require("../Controllers/authController");
const router = express.Router();

router.post(
	"/signup",
	authController.protected,
	authController.restrictTo("admin", "superAdmin"),
	authController.SignUp
);
router.post("/login", authController.LogIn);
// router.post("/login-user-student/:ref_num", authController.student);

router
	.route("/")
	.get(
		authController.protected,
		authController.restrictTo("admin", "superAdmin", "supervisor"),
		authController.getAllUsers
	);
router
	.route("/:id")
	.get(
		authController.protected,
		authController.restrictTo("admin", "superAdmin", "supervisor"),
		authController.getUser
	);

module.exports = router;
