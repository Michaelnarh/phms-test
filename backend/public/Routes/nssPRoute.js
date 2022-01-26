const express = require("express");
const nssPController = require("../Controllers/nssPController");
const router = express.Router();

router
	.route("/")
	.get(nssPController.getAllNSSPersonnel)
	.post(nssPController.createNSSPersonnel);

router
	.route("/:id")
	.get(nssPController.getNSSPersonnel)
	.patch(nssPController.updateNSSPersonel)
	.delete(nssPController.deleteNSSPersonnel);

module.exports = router;
