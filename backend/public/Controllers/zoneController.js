const Zone = require("../Models/ZoneModel");
const ApiFeatures = require("../utils/APIfeatures");

//create new Zone
exports.createZone = async (req, res) => {
	try {
		const newZone = await Zone.create(req.body);
		res.status(201).json({
			status: "success",
			newZone,
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};

//update info on a zone
exports.updateZone = async (req, res) => {
	if (!req.params.id) {
		throw Error("Zone  not identified");
	}
	try {
		const zone = await Zone.findByIdAndUpdate(req.params.id, req.body, {
			runValidator: true,
			new: true,
		});
		res.status(201).json({
			status: "success",
			zone,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};

// get ad particular zone
exports.getZone = async (req, res) => {
	try {
		const zone = await Zone.findById(req.params.id).populate("tutor");
		res.status(200).json({
			status: "success",
			data: zone,
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};

//get all zones
exports.getAllZones = async (req, res) => {
	try {
		// const zones = Zone.find();
		const feature = new ApiFeatures(Zone.find({}).populate("tutor"), req.query)
			.filter()
			.paginate(25);

		const zones = await feature.query;
		res.status(200).json({
			status: "success",
			data: zones,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};

//delete a zone
exports.deleteZone = async (req, res, next) => {
	try {
		const zone_id = req.params.id;
		if (!zone_id) throw new Error("Zone id is required for this operation");
		const zone = await Zone.findById(zone_id);
		await Zone.findByIdAndDelete(zone_id);
		const zones = Zone.find();
		res.status(200).json({
			status: "success",
			message: `The zone name  ${zone.name} is deleted successfully`,
			data: zones,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};
