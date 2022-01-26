const express = require("express");
const zoneController = require("../Controllers/zoneController");
const router = express.Router();

router
	.route("/")
	.post(zoneController.createZone)
	.get(zoneController.getAllZones);

router
	.route("/:id")
	.get(zoneController.getZone)
	.patch(zoneController.updateZone)
	.delete(zoneController.deleteZone);

module.exports = router;
