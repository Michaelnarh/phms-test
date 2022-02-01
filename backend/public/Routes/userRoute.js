const express = require("express");
const authController = require("../Controllers/authController");
const router = express.Router();

router.post("/signup", authController.SignUp);
router.post("/login", authController.LogIn);

router.route("/").get(authController.getAllUsers);

module.exports = router;
