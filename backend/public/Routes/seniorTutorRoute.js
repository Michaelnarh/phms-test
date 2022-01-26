const express = require("express");
const seniorTutorController = require("../Controllers/seniorTutorController");
const router = express.Router();

router
	.route("/")
	.post(seniorTutorController.createSeniorTutor)
	.get(seniorTutorController.getAllSeniorTutors);

router
	.route("/:id")
	.get(seniorTutorController.getSeniorTutor)
	.patch(seniorTutorController.updateSeniorTutor)
	.delete(seniorTutorController.deleteSeniorTutor);

module.exports = router;
