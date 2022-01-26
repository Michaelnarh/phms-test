const Residence = require("../Models/residenceModel");

//create new Residence
exports.createResidence = async (req, res) => {
	try {
		const newResidence = await Residence.create(req.body);
		res.status(201).json({
			status: "success",
			newResidence,
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};

//update an info about a Residence
exports.updateResidence = async (req, res) => {
	if (!req.params.id) {
		throw Error("Hostel  not identified");
	}
	try {
		const residence = await Residence.findByIdAndUpdate(
			req.params.id,
			req.body
		);
		res.status(201).json({
			status: "success",
			residence,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};

//get a particular  Residence
exports.getResidence = async (req, res) => {
	try {
		const residence = await Residence.findById(req.params.id).populate(
			"reviews"
		);
		res.status(200).json({
			status: "success",
			residence,
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};

// get all residences
exports.getAllResidence = async (req, res) => {
	try {
		const residences = await Residence.find();

		const queryObj = { ...req.query };
		const excludedFields = ["page", "sort", "limit", "fields"];
		excludedFields.forEach((el) => delete queryObj[el]);

		let queryStr = JSON.stringify(queryObj);
		queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

		let query = await Residence.find(JSON.parse(queryStr));

		// if (req.query.sort) {
		//   const sortBy = req.query.sort.split(",").join(" ");
		//   query = query.sort(sortBy);
		// } else {
		//   query.sort("-createdAt");
		// }

		//fields limiting
		// if (req.query.fields) {
		//   const fields = req.query.limi.split(",").join(" ");
		//   query = query.select(fields);
		// } else {
		//   query = query.select("-__v");
		// }
		//  const page = (req.query.page * 1) | 1;
		//     const limit = (req.query.limit * 1) | 30;
		//     const skip = (page - 1) * limit;

		//     query = query.skip(skip).limit(limit);
		//pagination

		res.status(200).json({
			status: "success",
			message: residences,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};

// Delete a Residence Record

exports.deleteResidence = async (req, res, next) => {
	try {
		const residence_id = req.params.id;
		if (!residence_id)
			throw new Error("Hostel id is required for this operation");
		const residence = await Residence.findById(residence_id);
		await Residence.findByIdAndDelete(residence_id);
		res.status(200).json({
			status: "success",
			message: `Residence records of  ${residence.name} is deleted successfully`,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};
