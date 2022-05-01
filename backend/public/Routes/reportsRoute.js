const express = require("express");

const reportController = require("../Controllers/reportController");

const router = express.Router();

router.get("/owners", reportController.getOwners);

module.exports = router;
