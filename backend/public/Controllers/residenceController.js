const Residence = require("../Models/residenceModel");
const AppError = require("../utils/AppError");
const multer = require("multer");
const ApiFeatures = require("../utils/APIfeatures");
const sharp = require("sharp");
const fs = require("fs");

//create new Residence

const multerStorage = multer.memoryStorage();
const multerFilter = async (req, file, cb) => {
	if (file.mimetype.startsWith("image")) {
		cb(null, true);
		const dir = `public/images/${req.params.id.slice(20, 24)}`;
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}
	}
	/// handle error when type is incorrect
};

exports.resizeImage = (req, res, next) => {
	if (!req.file) return next();
	req.file.filename = `coverImage-${Date.now()}.jpeg`;
	const dir = `public/images/${req.params.id.slice(20, 24)}`;

	sharp(req.file.buffer)
		.resize(500, 500)
		.toFormat("jpeg")
		.jpeg({ quality: 90 })
		.toFile(`${dir}/${req.file.filename}`);
	next();
};
const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
});
// const upload = multer({ dest: "public/images/photo" });
exports.uploadCoverImage = upload.single("coverImage");

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
exports.updateResidence = async (req, res, next) => {
	if (!req.params.id) {
		throw Error("Hostel  not identified");
	}
	try {
		if (req.file) req.body.coverImage = req.file.filename;
		const residence = await Residence.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
			}
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
		// const queryObj = { ...req.query };
		// const excludedFields = ["page", "sort", "limit", "fields"];
		// excludedFields.forEach((el) => delete queryObj[el]);
		// console.log(req.query, queryObj);

		// let queryStr = JSON.stringify(queryObj);
		// queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

		// let query = await Residence.find(JSON.parse(queryStr));

		const features = new ApiFeatures(Residence.find(), req.query)
			.filter()
			.paginate(2);
		const residences = await features.query;

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
			total: residences.length,
			status: "success",
			data: residences,
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

//get all available homestels
exports.getHomestels = async (req, res) => {
	try {
		const homestels = await Residence.find({ residenceType: "Homestel" });
		//paginate response
		res.status(200).json({
			status: "success",
			message: homestels,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};
//get all available homestels
exports.getHostels = async (req, res) => {
	try {
		const hostels = await Residence.find({ residenceType: "Hostel" });
		//paginate response
		const feature = new ApiFeatures(
			Residence.find({ residenceType: "Hostel" }).populate({
				path: "zone",
				select: "name",
			}),
			req.query
		)
			.filter()
			.paginate(25);

		const current_hostels = await feature.query;
		res.status(200).json({
			total: hostels.length,
			status: "success",
			data: current_hostels,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};
