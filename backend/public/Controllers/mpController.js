const MP = require("../Models/mpModel");

//create new MP
exports.createMP = async (req, res) => {
	try {
		const mp = await MP.create(req.body);
		res.status(201).json({
			status: "success",
			mp,
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};

//update info on a MP
exports.updateMP = async (req, res) => {
	if (!req.params.id) {
		throw Error("MP  not identified");
	}
	try {
		const mp = await MP.findByIdAndUpdate(req.params.id, req.body);
		res.status(201).json({
			status: "success",
			mp,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};

// get ad particular MP
exports.getMP = async (req, res) => {
	try {
		const mp = await MP.findById(req.params.id);
		res.status(200).json({
			status: "success",
			mp,
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};

//get all MP
exports.getAllMPs = async (req, res) => {
	try {
		const mps = await MP.find();
		res.status(200).json({
			status: "success",
			message: mps,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};

//delete a MP
exports.deleteMP = async (req, res, next) => {
	try {
		const mp_id = req.params.id;
		if (!mp_id) throw new Error("MP id is required for this operation");
		const mp = await MP.findById(mp_id);
		await MP.findByIdAndDelete(mp_id);
		res.status(200).json({
			status: "success",
			message: `MP records of  ${mp.name} is deleted successfully`,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};
