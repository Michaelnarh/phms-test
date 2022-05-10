const AssemblyMember = require("../Models/assemblyMemModel");
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
	let dir = `public/images/assembly-members`;

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

//create new AssemblyMember
exports.createAssemblyMem = async (req, res) => {
	try {
		req.body.slug = await slugify(req.body.name, { lower: true });
		const assemblyMem = await AssemblyMember.create(req.body);
		res.status(201).json({
			status: "success",
			assemblyMem,
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};

//update info on a AssemblyMember
exports.updateAssemblyMem = async (req, res) => {
	if (!req.params.id) {
		throw Error("AssemblyMember  not identified");
	}
	try {
		req.body.slug = await slugify(req.body.name, { lower: true });
		const assemblyMem = await AssemblyMember.findByIdAndUpdate(
			req.params.id,
			req.body
		);
		res.status(201).json({
			status: "success",
			data: assemblyMem,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};

// get ad particular AssemblyMember
exports.getAssemblyMem = async (req, res) => {
	try {
		const assemblyMem = await AssemblyMember.findOne({
			slug: req.params.slug,
		});
		res.status(200).json({
			status: "success",
			data: assemblyMem,
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};

//get all AreaMPs
exports.getAllAssemblyMem = async (req, res) => {
	try {
		const areaMP = await AssemblyMember.find();
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

//delete an AssemblyMember
exports.deleteAssemblyMem = async (req, res, next) => {
	try {
		const assemblyMem_id = req.params.id;
		if (!assemblyMem_id)
			throw new Error("AssemblyMember id is required for this operation");
		const assemblyMem = await AssemblyMember.findById(assemblyMem_id);
		await AssemblyMember.findByIdAndDelete(assemblyMem_id);
		res.status(200).json({
			status: "success",
			message: `AssemblyMember records of  ${assemblyMem.name} is deleted successfully`,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};
