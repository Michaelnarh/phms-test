const express = require("express");
const residenceController = require("../Controllers/residenceController");
const router = express.Router();

router
	.route("/")
	.get(residenceController.getAllResidence)
	.post(residenceController.createResidence);

router
	.route("/:id")
	.get(residenceController.getResidence)
	.patch(residenceController.updateResidence)
	.delete(residenceController.deleteResidence);

module.exports = router;
