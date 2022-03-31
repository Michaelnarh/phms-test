const NSSPersonnel = require("../Models/nssPModel");
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
	let dir = `public/images/nss-personnels`;

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
//create new NSSPersonnel
exports.createNSSPersonnel = async (req, res) => {
	try {
		req.body.slug = slugify(req.body.name, { lower: true });
		const nssPerssonnel = await NSSPersonnel.create(req.body);
		res.status(201).json({
			status: "success",
			nssPerssonnel,
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};

//update info on a NSSPersonnel
exports.updateNSSPersonel = async (req, res) => {
	if (!req.params.id) {
		throw Error("NSSPersonnel  not identified");
	}
	try {
		console.log(req.params.id);
		if (req.body.name) {
			req.body.slug = await slugify(req.body.name, { lower: true });
		}
		const nssPerssonnel = await NSSPersonnel.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				runValidators: true,
				new: true,
			}
		);
		res.status(201).json({
			status: "success",
			data: nssPerssonnel,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};

// get a particular NSSPersonnel
exports.getNSSPersonnel = async (req, res) => {
	try {
		const nssPerssonnel = await NSSPersonnel.findOne({
			slug: req.params.slug,
		}).populate("tutor");
		res.status(200).json({
			status: "success",
			data: nssPerssonnel,
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};

//get all NSS personnels
exports.getAllNSSPersonnel = async (req, res) => {
	try {
		const nssPerssonnels = await NSSPersonnel.find().populate("tutor");
		res.status(200).json({
			status: "success",
			data: nssPerssonnels,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};

//delete a NSSPersonnel
exports.deleteNSSPersonnel = async (req, res, next) => {
	try {
		const nssP_id = req.params.id;
		if (!nssP_id)
			throw new Error("NSSPersonnel id is required for this operation");
		const nssPersonnel = await NSSPersonnel.findById(nssP_id);
		await NSSPersonnel.findByIdAndDelete(nssP_id);
		res.status(200).json({
			status: "success",
			message: `NSSPersonnel records of  ${nssPersonnel.name} is deleted successfully`,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};
