const AreaMP = require("../Models/areaMPModel");
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
	let dir = `public/images/area-mps`;

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

//create new AreaMP
exports.createAreaMP = async (req, res) => {
	try {
		req.body.slug = await slugify(req.body.name, { lower: true });
		const areaMP = await AreaMP.create(req.body);
		res.status(201).json({
			status: "success",
			areaMP,
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};

//update info on a AreaMP
exports.updateAreaMP = async (req, res) => {
	if (!req.params.id) {
		throw Error("AreaMP  not identified");
	}
	try {
		req.body.slug = await slugify(req.body.name, { lower: true });
		const areaMP = await AreaMP.findByIdAndUpdate(req.params.id, req.body);
		res.status(201).json({
			status: "success",
			data: areaMP,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};

// get ad particular AreaMP
exports.getAreaMP = async (req, res) => {
	try {
		const areaMP = await AreaMP.findOne({ slug: req.params.slug }).populate([
			"zone",
			"tutor",
		]);
		res.status(200).json({
			status: "success",
			data: areaMP,
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};

//get all AreaMPs
exports.getAllAreaMP = async (req, res) => {
	try {
		const areaMP = await AreaMP.find().populate("zone").populate("tutor");
		res.status(200).json({
			status: "success",
			data: areaMP,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};

//delete a AreaMP
exports.deleteAreaMP = async (req, res, next) => {
	try {
		const areaMP_id = req.params.id;
		if (!areaMP_id) throw new Error("AreaMP id is required for this operation");
		const areaMP = await AreaMP.findById(areaMP_id);
		await AreaMP.findByIdAndDelete(areaMP_id);
		res.status(200).json({
			status: "success",
			message: `AreaMP records of  ${areaMP.name} is deleted successfully`,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};
