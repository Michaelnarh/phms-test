const express = require("express");
const areaMPController = require("../Controllers/areaMPController");
const router = express.Router();

router
	.route("/")
	.get(areaMPController.getAllAreaMP)
	.post(areaMPController.createAreaMP);

router
	.route("/:id")
	.get(areaMPController.getAreaMP)
	.patch(areaMPController.updateAreaMP)
	.delete(areaMPController.deleteAreaMP);

module.exports = router;
