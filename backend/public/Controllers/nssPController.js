const NSSPersonnel = require("../Models/nssPModel");

//create new NSSPersonnel
exports.createNSSPersonnel = async (req, res) => {
	try {
		const nssPerssonnel = await NSSPersonnel.create(req.body);
		res.status(201).json({
			status: "success",
			nssPerssonnel,
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};

//update info on a NSSPersonnel
exports.updateNSSPersonel = async (req, res) => {
	if (!req.params.id) {
		throw Error("NSSPersonnel  not identified");
	}
	try {
		const nssPerssonnel = await NSSPersonnel.findByIdAndUpdate(
			req.params.id,
			req.body
		);
		res.status(201).json({
			status: "success",
			nssPerssonnel,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};

// get a particular NSSPersonnel
exports.getNSSPersonnel = async (req, res) => {
	try {
		const nssPerssonnel = await NSSPersonnel.findById(req.params.id);
		res.status(200).json({
			status: "success",
			nssPerssonnel,
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};

//get all NSS personnels
exports.getAllNSSPersonnel = async (req, res) => {
	try {
		const nssPerssonnel = await NSSPersonnel.find();
		res.status(200).json({
			status: "success",
			message: nssPerssonnel,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};

//delete a NSSPersonnel
exports.deleteNSSPersonnel = async (req, res, next) => {
	try {
		const nssP_id = req.params.id;
		if (!nssP_id)
			throw new Error("NSSPersonnel id is required for this operation");
		const nssPersonnel = await NSSPersonnel.findById(nssP_id);
		await NSSPersonnel.findByIdAndDelete(nssP_id);
		res.status(200).json({
			status: "success",
			message: `NSSPersonnel records of  ${nssPersonnel.name} is deleted successfully`,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};
