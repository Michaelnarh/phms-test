const express = require("express");
const LocationController = require("../Controllers/locationController");
const router = express.Router();

router
	.route("/")
	.post(LocationController.createLocation)
	.get(LocationController.getAllLocations);

router
	.route("/:id")
	.get(LocationController.getlocation)
	.patch(LocationController.updateLocation)
	.delete(LocationController.deleteLocation);

module.exports = router;
