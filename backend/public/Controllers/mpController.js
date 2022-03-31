const MP = require("../Models/mpModel");
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
	let dir = `public/images/mps`;

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

//create new MP
exports.createMP = async (req, res) => {
	try {
		req.body.slug = slugify(req.body.slug, { lower: true });
		const mp = await MP.create(req.body);
		res.status(201).json({
			status: "success",
			mp,
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};

//update info on a MP
exports.updateMP = async (req, res) => {
	if (!req.params.id) {
		throw Error("MP  not identified");
	}
	try {
		if (req.body.name) {
			req.body.slug = slugify(req.body.name, { lower: true });
		}
		const mp = await MP.findByIdAndUpdate(req.params.id, req.body, {
			runValidators: true,
			new: true,
		});
		res.status(201).json({
			status: "success",
			data: mp,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};

// get ad particular MP
exports.getMP = async (req, res) => {
	try {
		const mp = await MP.findOne({ slug: req.params.slug });
		res.status(200).json({
			status: "success",
			data: mp,
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};

//get all MP
exports.getAllMPs = async (req, res) => {
	try {
		const mps = await MP.find().populate("tutor");
		res.status(200).json({
			status: "success",
			data: mps,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};

//delete a MP
exports.deleteMP = async (req, res, next) => {
	try {
		const mp_id = req.params.id;
		if (!mp_id) throw new Error("MP id is required for this operation");
		const mp = await MP.findById(mp_id);
		await MP.findByIdAndDelete(mp_id);
		res.status(200).json({
			status: "success",
			message: `MP records of  ${mp.name} is deleted successfully`,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};
