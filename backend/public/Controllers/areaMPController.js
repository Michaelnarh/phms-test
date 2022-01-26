const AreaMP = require("../Models/areaMPModel");

//create new AreaMP
exports.createAreaMP = async (req, res) => {
	try {
		const areaMP = await AreaMP.create(req.body);
		res.status(201).json({
			status: "success",
			areaMP,
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};

//update info on a AreaMP
exports.updateAreaMP = async (req, res) => {
	if (!req.params.id) {
		throw Error("AreaMP  not identified");
	}
	try {
		const areaMP = await AreaMP.findByIdAndUpdate(req.params.id, req.body);
		res.status(201).json({
			status: "success",
			areaMP,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};

// get ad particular AreaMP
exports.getAreaMP = async (req, res) => {
	try {
		const areaMP = await AreaMP.findById(req.params.id);
		res.status(200).json({
			status: "success",
			areaMP,
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};

//get all AreaMPs
exports.getAllAreaMP = async (req, res) => {
	try {
		const areaMP = await AreaMP.find();
		res.status(200).json({
			status: "success",
			message: areaMP,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};

//delete a AreaMP
exports.deleteAreaMP = async (req, res, next) => {
	try {
		const areaMP_id = req.params.id;
		if (!areaMP_id) throw new Error("AreaMP id is required for this operation");
		const areaMP = await AreaMP.findById(areaMP_id);
		await AreaMP.findByIdAndDelete(areaMP_id);
		res.status(200).json({
			status: "success",
			message: `AreaMP records of  ${areaMP.name} is deleted successfully`,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};
