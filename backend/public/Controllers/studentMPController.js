const StudentMP = require("../Models/studentMPModel");
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
	let dir = `public/images/student-mps`;

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

//create new StudentMP
exports.createStudentMP = async (req, res) => {
	try {
		req.body.slug = await slugify(req.body.name, { lower: true });
		const studentMP = await StudentMP.create(req.body);
		res.status(201).json({
			status: "success",
			studentMP,
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};

//update info on a StudentMP
exports.updateStudentMP = async (req, res) => {
	if (!req.params.id) {
		throw Error("StudentMP  not identified");
	}
	try {
		req.body.slug = await slugify(req.body.name, { lower: true });
		const studentMP = await StudentMP.findByIdAndUpdate(
			req.params.id,
			req.body
		);
		res.status(201).json({
			status: "success",
			data: studentMP,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};

// get ad particular StudentMP
exports.getStudentMP = async (req, res) => {
	try {
		const studentMP = await StudentMP.findOne({
			slug: req.params.slug,
		}).populate(["zone", "tutor"]);
		res.status(200).json({
			status: "success",
			data: studentMP,
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};

//get all AreaMPs
exports.getAllStudentMP = async (req, res) => {
	try {
		const studentMP = await StudentMP.find().populate(["zone", "tutor"]);
		res.status(200).json({
			status: "success",
			data: studentMP,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};

//delete a StudentMP
exports.deleteStudentMP = async (req, res, next) => {
	try {
		const studentMP_id = req.params.id;
		if (!studentMP_id)
			throw new Error("StudentMP id is required for this operation");
		const studentMP = await StudentMP.findById(studentMP_id);
		await StudentMP.findByIdAndDelete(studentMP_id);
		res.status(200).json({
			status: "success",
			message: `StudentMP records of  ${studentMP.name} is deleted successfully`,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};
