const Residence = require("../Models/residenceModel");
const Zone = require("../Models/ZoneModel");
const Location = require("../Models/locationModel");
const SnrTutor = require("../Models/seniorTutorModel");
const NssPersonnel = require("../Models/nssPModel");
const Facility = require("../Models/facilityModel");
const AreaMp = require("../Models/mpModel");
const AppError = require("../utils/AppError");
const ApiFeatures = require("../utils/APIfeatures");
//import of of special modules
const sharp = require("sharp");
const multer = require("multer");
const slugify = require("slugify");
const fs = require("fs");

const multerStorage = multer.memoryStorage({
	destination: (req, file, cb) => {},
}); //create memorystorage for sharp resizing

const multerFilter = async (req, file, cb) => {
	if (file.mimetype.startsWith("image")) {
		cb(null, true);
	}
	return new AppError("image format not supported", 400); // handle error when type is incorrect
};

exports.resizeImage = async (req, res, next) => {
	if (!req.files) return next();
	const filename_cover = `cover-image-${Date.now()}.jpeg`;
	if (req.body.name) {
		const slug = slugify(req.body.name, { lower: true });
		const dir = `public/images/${slug}`;

		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}

		if (req.files["coverImage"]) {
			await sharp(req.files["coverImage"][0].buffer)
				.resize(500, 500)
				.toFormat("jpeg")
				.jpeg({ quality: 90 })
				.toFile(`${dir}/${filename_cover}`);
			req.body.coverImage = filename_cover;
		}

		if (req.files["images"]) {
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
		}
	}
	next();
};

const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
});

//upload  for the cover-image & images.
exports.uploadImages = upload.fields([
	{ name: "coverImage", maxCount: 1 },
	{ name: "images", maxCount: 8 },
]);

//create new Residence
exports.createResidence = async (req, res) => {
	try {
		// console.log(req.body);
		req.body.slug = await slugify(req.body.name, { lower: true });
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
		if (req.body.name) {
			// req.body.slug = await slugify(req.body.name, { lower: true });
		}
		const residence = await Residence.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				// runValidators: true,
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
		const residence = await Residence.findOne({
			slug: req.params.slug,
		}).populate([
			{ path: "reviews" },
			{ path: "location", populate: { path: "zone" } },
		]);

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
		const features = new ApiFeatures(
			Residence.find().populate("location"),
			req.query
		)
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
		const feature = new ApiFeatures(
			Residence.find({ residenceType: "Homestel" }).populate({
				path: "location",
				populate: { path: "zone", select: ["name"] },
			}),
			req.query
		)
			.filter()
			.paginate(25);

		const current_homestels = await feature.query;
		res.status(200).json({
			status: "success",
			total: homestels.length,
			data: current_homestels,
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
				path: "location",
				populate: { path: "zone", select: ["name"] },
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

exports.getStatistics = async (req, res) => {
	try {
		const hostels_num = await Residence.find({
			residenceType: "Hostel",
		}).countDocuments();

		const reg_hostels_num = await Residence.find({
			residenceType: "Hostel",
			registered: true,
		}).countDocuments();

		const homestels_num = await Residence.find({
			residenceType: "Homestel",
		}).countDocuments();

		const reg_homestels_num = await Residence.find({
			residenceType: "Homestel",
			registered: true,
		}).countDocuments();

		const zones_num = await Zone.find().countDocuments();

		const location_num = await Location.find().countDocuments();
		const nssP_num = await NssPersonnel.find().countDocuments();
		const snr_tutors_num = await SnrTutor.find().countDocuments();
		const facility_num = await Facility.find().countDocuments();
		const area_mp_num = await AreaMp.find().countDocuments();

		res.status(200).json({
			status: "succes",
			data: {
				hostels_num,
				reg_hostels_num,
				homestels_num,
				reg_homestels_num,
				zones_num,
				location_num,
				nssP_num,
				snr_tutors_num,
				facility_num,
				area_mp_num,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};
