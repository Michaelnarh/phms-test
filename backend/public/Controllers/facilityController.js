const Facility = require("../Models/facilityModel");
const ApiFeatures = require("../utils/APIfeatures");

//create new Facility
exports.createFacility = async (req, res) => {
	try {
		const newFacility = await Facility.create(req.body);
		res.status(201).json({
			status: "success",
			data: newFacility,
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};

//update info on a Facility
exports.updateFacility = async (req, res) => {
	if (!req.params.id) {
		throw Error("Facility  not identified");
	}
	try {
		const facility = await Facility.findByIdAndUpdate(req.params.id, req.body, {
			runValidators: true,
			new: true,
		});
		res.status(201).json({
			status: "success",
			facility,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};

// get ad particular zone
exports.getFacility = async (req, res) => {
	try {
		const facility = await Facility.findById(req.params.id);
		res.status(200).json({
			status: "success",
			data: facility,
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};

//get all Facilities

exports.getAllFacilities = async (req, res) => {
	try {
		const facilities = await Facility.find().countDocuments();

		const feature = new ApiFeatures(Facility.find(), req.query)
			.filter()
			.paginate(25);

		const current_facilities = await feature.query;
		res.status(200).json({
			status: "success",
			total: facilities,
			data: current_facilities,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};

//delete a facility
exports.deleteFacility = async (req, res) => {
	try {
		const facility_id = req.params.id;
		if (!facility_id)
			throw new Error("Facility id is required for this operation");
		const facility = await Facility.findById(facility_id);
		await Facility.findByIdAndDelete(facility_id);
		res.status(200).json({
			status: "success",
			message: `Facility records of  ${facility.name} is deleted successfully`,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};
