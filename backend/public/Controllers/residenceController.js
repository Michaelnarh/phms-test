const Residence = require("../Models/residenceModel");
const AppError = require("../utils/AppError");
const multer = require("multer");
const ApiFeatures = require("../utils/APIfeatures");
const sharp = require("sharp");
const fs = require("fs");

const multerStorage = multer.memoryStorage(); //create memorystorage for sharp resizing

const multerFilter = async (req, file, cb) => {
	// if (files.mimetype.startsWith("image")) {
	cb(null, true);
	// }
	/// handle error when type is incorrect
};

exports.resizeImage = async (req, res, next) => {
	// if (!req.files) return next();
	// console.log(req.files);
	const filename_cover = `cover-image-${Date.now()}.jpeg`;
	const dir = `public/images/${req.params.id.slice(20, 24)}`;
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}

	await sharp(req.files["coverImage"][0].buffer)
		.resize(500, 500)
		.toFormat("jpeg")
		.jpeg({ quality: 90 })
		.toFile(`${dir}/${filename_cover}`);

	req.body.coverImage = filename_cover;

	req.body.images = [];

	await Promise.all(
		req.files["images"].map(async (el) => {
			const filename = `image-${Date.now()}.jpeg`;
			await sharp(el.buffer)
				.resize(500, 500)
				.toFormat("jpeg")
				.jpeg({ quality: 90 })
				.toFile(`${dir}/${filename}`);
			req.body.images.push(filename);
		})
	);

	next();
};

const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
});

//upload single file for the cover-image & images.
exports.uploadImages = upload.fields([
	{ name: "coverImage", maxCount: 1 },
	{ name: "images", maxCount: 8 },
]);

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
exports.updateResidence = async (req, res, next) => {
	if (!req.params.id) {
		throw Error("Hostel  not identified");
	}
	try {
		// if (req.files) req.body.coverImage = req.file.filename;

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
			data: residence,
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
		const features = new ApiFeatures(Residence.find(), req.query)
			.filter()
			.paginate(25);
		const residences = await features.query;

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

exports.getStatistic = (req, res) => {
	const hostels_num = Residence.find({
		residenceType: "Hostel",
	}).countDocument();
};
