const AcademicYear = require("../Models/academicYearModel");
const ApiFeatures = require("../utils/APIfeatures");

//create new AcademicYear
exports.createAcademicYea = async (req, res) => {
	try {
		const newAcademicYear = await AcademicYear.create(req.body);
		res.status(201).json({
			status: "success",
			newAcademicYear,
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};

//update info on a Academic year
exports.updateAcademicYear = async (req, res) => {
	if (!req.params.id) {
		throw Error("AcademicYear  not identified");
	}
	try {
		const academicYear = await AcademicYear.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				runValidator: true,
				new: true,
			}
		);
		res.status(201).json({
			status: "success",
			academicYear,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};

// get ad particular academich year
exports.getAcademicYear = async (req, res) => {
	try {
		const academicYear = await AcademicYear.findById(req.params.id).populate(
			"tutor"
		);
		res.status(200).json({
			status: "success",
			data: academicYear,
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};

//get all acadmich years
exports.getAllAcademicYears = async (req, res) => {
	try {
		// const zones = AcademicYear.find();
		const feature = new ApiFeatures(
			AcademicYear.find().populate(["tutor"]),
			req.query
		)
			.filter()
			.paginate(25);

		const academicYears = await feature.query;
		res.status(200).json({
			status: "success",
			data: academicYears,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};

//delete an acadmich year
exports.deleteAacdemicYear = async (req, res, next) => {
	try {
		const acdemicYear_id = req.params.id;
		if (!acdemicYear_id)
			throw new Error("AcademicYear id is required for this operation");
		const academicYear = await AcademicYear.findById(acdemicYear_id);
		await AcademicYear.findByIdAndDelete(acdemicYear_id);
		res.status(200).json({
			status: "success",
			message: `The Academic Year name  ${academicYear.name} is deleted successfully`,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};
