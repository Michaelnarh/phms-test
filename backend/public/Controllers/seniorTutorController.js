const SeniorTutor = require("../Models/seniorTutorModel");

//create new SeniorTutor
exports.createSeniorTutor = async (req, res) => {
	try {
		const newSeniorTutor = await SeniorTutor.create(req.body);
		res.status(201).json({
			status: "success",
			newSeniorTutor,
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};

//update info on a SeniorTutor
exports.updateSeniorTutor = async (req, res) => {
	if (!req.params.id) {
		throw Error("SeniorTutor  not identified");
	}
	try {
		const seniorTutor = await SeniorTutor.findByIdAndUpdate(
			req.params.id,
			req.body
		);
		res.status(201).json({
			status: "success",
			seniorTutor,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};

// get ad particular SeniorTutor
exports.getSeniorTutor = async (req, res) => {
	try {
		const seniorTutor = await SeniorTutor.findById(req.params.id);
		res.status(200).json({
			status: "success",
			seniorTutor,
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};

//get all Tutors
exports.getAllSeniorTutors = async (req, res) => {
	try {
		const seniorTutors = await SeniorTutor.find();
		res.status(200).json({
			status: "success",
			message: seniorTutors,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};

//delete a Tutor
exports.deleteSeniorTutor = async (req, res, next) => {
	try {
		const tutor_id = req.params.id;
		if (!tutor_id)
			throw new Error("SeniorTutor id is required for this Operation");
		const tutor = await SeniorTutor.findById(tutor_id);
		await SeniorTutor.findByIdAndDelete(tutor_id);
		res.status(200).json({
			status: "success",
			message: `SeniorTutor records of  ${tutor.name} is deleted successfully`,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};
