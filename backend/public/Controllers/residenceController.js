const Residence = require("../Models/residenceModel");
const ResidenceFacilityTable = require("../Models/residenceFacilityTable");
const Zone = require("../Models/ZoneModel");
const Location = require("../Models/locationModel");
const SnrTutor = require("../Models/seniorTutorModel");
const NssPersonnel = require("../Models/nssPModel");
const Facility = require("../Models/facilityModel");
const AreaMp = require("../Models/mpModel");
const RegistrationTable = require("../Models/registrationTable");
const AppError = require("../utils/AppError");
const ApiFeatures = require("../utils/APIfeatures");
const SortBy = require("../utils/sort");

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
				.resize(700, 400)
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
						.resize(700, 400)
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
	{ name: "images", maxCount: 8 },
	{ name: "coverImage", maxCount: 1 },
]);

//create new Residence
exports.createResidence = async (req, res) => {
	try {
		// console.log(req.body);
		req.body.slug = await slugify(req.body.name, { lower: true });
		const coordinates = [];
		coordinates[0] = parseFloat(req.body.lng);
		coordinates[1] = parseFloat(req.body.lat);
		req.body.gpsAddress = {
			type: "Point",
			coordinates,
		};
		// console.log(req.body.gpsAddress);
		//
		const newResidence = await Residence.create(req.body);

		// and create with that residnce id
		let residence_id = newResidence._id;
		let facility_id;
		let facility_count;

		let facilities = [];
		facilities = JSON.parse(req.body.facilities);

		/* an array object like this

				facilities[{id[9088009], count:3},{id[9088909], count:1}]
		*/
		//loop through the facilities
		console.log(facilities);

		if (facilities?.length > 0) {
			await Promise.all(
				facilities.map(async (item) => {
					if (item?.id && item?.num) {
						if (item?.id[0]) {
							facility_id = item?.id[0];
							facility_count = item.num;
						}
						await ResidenceFacilityTable.create({
							residence: residence_id,
							facility: facility_id,
							count: facility_count,
						});
					}
				})
			);
		}
		// const facility_count= facility.count;

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
		})
			.populate({ path: "reviews", sort: "-createdAt" })
			.populate([{ path: "location", populate: { path: "zone" } }]);

		const facilities = await ResidenceFacilityTable.find({
			residence: residence?._id,
		}).populate({ path: "facility" });

		res.status(200).json({
			status: "success",
			data: residence,
			facilities,
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
			Residence.find().populate({
				path: "location",
				populate: { path: "zone" },
			}),
			req.query
		)
			.filter()
			.sort()
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
		const regArray = await RegistrationTable.find({ residence: residence_id });

		Promise.all(
			regArray.map(
				async (el) => await RegistrationTable.findOneAndDelete({ _id: el?._id })
			)
		);
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

exports.getZonalGpsAdrress = async (req, res) => {
	const zone_id = req.params.zone_id;
	try {
		const residences = await Residence.find().populate({
			path: "location",
			populate: { path: "zone" },
		});
		let zoneArray = [];
		residences.forEach((item) => {
			if (
				item?.location?.zone?._id.toString() === req.params.zone_id.toString()
			) {
				const data = {
					_id: item?._id,

					name: item?.name,

					zone_id: item?.location?.zone?._id,

					gpsAddress: item?.gpsAddress,
				};
				zoneArray.push(data);
			}
		});

		res.status(200).json({
			status: "success",
			data: zoneArray,
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
	//
};
