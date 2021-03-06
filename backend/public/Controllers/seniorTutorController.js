const SeniorTutor = require("../Models/seniorTutorModel");
const AppError = require("../utils/AppError");
const fs = require("fs");
const multer = require("multer");
const sharp = require("sharp");
const slugify = require("slugify");

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
	console.log(req.file);
	if (!req.file) return next();
	const slug = await slugify(req.body.name, { lower: true });
	req.body.slug = slug;
	const profile_image = `profile-${slug}-${Date.now()}.jpeg`;
	let dir = `public/images/snr-tutors`;

	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}

	if (req.file.buffer) {
		await sharp(req.file.buffer)
			.resize(500, 500)
			.toFormat("jpeg")
			.jpeg({ quality: 90 })
			.toFile(`${dir}/${profile_image}`);
		req.body.image = profile_image;
	}

	next();
};

const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
});

//upload profile image.
exports.uploadImage = upload.single("image");

//create new SeniorTutor
exports.createSeniorTutor = async (req, res) => {
	try {
		req.body.slug = slugify(req.body.name, { lower: true });
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

	console.log(req.body);
	try {
		if (req.body.name) {
			req.body.slug = slugify(req.body.name, { lower: true });
		}
		const seniorTutor = await SeniorTutor.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				runValidators: true,
				new: true,
			}
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
		const seniorTutor = await SeniorTutor.findOne({
			slug: req.params.slug,
		}).populate("zone");
		res.status(200).json({
			status: "success",
			data: seniorTutor,
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
		const seniorTutors = await SeniorTutor.find().populate({
			path: "zone",
		});
		res.status(200).json({
			status: "success",
			data: seniorTutors,
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
		const id = req.params.id;
		if (!id) throw new Error("SeniorTutor id is required for this Operation");
		const tutor = await SeniorTutor.findById(id);
		await SeniorTutor.findByIdAndDelete(id);
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

exports.handleDeActivate = async (req, res, next) => {
	try {
		const tutor = await SeniorTutor.findByIdAndUpdate(
			req.params.id,
			{
				isCurrent: false,
			},
			{
				new: true,
			}
		);

		res.status(200).json({
			status: "success",
			data: tutor,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};
exports.handleActivate = async (req, res, next) => {
	try {
		const tutor = await SeniorTutor.findByIdAndUpdate(
			req.params.id,
			{
				isCurrent: true,
			},
			{
				new: true,
			}
		);

		res.status(200).json({
			status: "success",
			data: tutor,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};
