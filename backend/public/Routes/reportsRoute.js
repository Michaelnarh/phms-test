const express = require("express");

const reportController = require("../Controllers/reportController");
const authController = require("../Controllers/authController");

const router = express.Router();

router.get("/owners", authController.protected, reportController.getOwners);
router.get("/managers", authController.protected, reportController.getManagers);
router.get("/porters", authController.protected, reportController.getPorters);
router.get("/hostels", authController.protected, reportController.getHostels);
router.get("/homestels", authController.protected, reportController.getHomesls);
router.get(
	"/registered",
	authController.protected,
	reportController.geRegisteredResidences
);
router.get(
	"/statistics",
	authController.protected,
	reportController.getRegisteredNumber
);
router.get("/test", authController.protected, reportController.testStram);

module.exports = router;
