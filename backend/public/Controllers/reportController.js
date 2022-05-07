const AcademicYear = require("../Models/academicYearModel");
const RegistrationTable = require("../Models/registrationTable");
const Residence = require("../Models/residenceModel");
const fs = require("fs");
const pdfkit = require("pdfkit-table");
const PDFDocument = require("pdfkit");
const SortBy = require("../utils/sort");
const myFormat = require("dateformat");

// const doc = new pdfkit();

exports.getOwners = async (req, res) => {
	try {
		// doc.pipe(fs.createWriteStream("document.pdf"));
		const residences = await Residence.find({}).populate({
			path: "location",
			populate: { path: "zone" },
		});
		let ownersArray = [];
		residences.forEach((el) => {
			const data = {
				_id: el._id,
				name: el.name,
				ownersName: el.ownersName || "N/A",
				ownersContact: el.ownersContact || "N/A",
				zone: el?.location?.zone?.name,
			};

			ownersArray.push(data);
		});
		const sortBy = new SortBy(ownersArray);
		const results = sortBy.byName().byZone();

		const tableArray = [];
		results.arr.forEach((el, i) => {
			const data = [i + 1, el.name, el.ownersName, el.ownersContact, el?.zone];

			tableArray.push(data);
		});

		const table = {
			title: "Owners Details",
			subtitle: "All Available Owners",
			headers: [
				"No.",
				"Hostel Name",
				"Owner's Name",
				"Owner's Contact",
				"zone Name",
			],
			rows: tableArray,
		};
		const doc = new pdfkit({ margin: 30, size: "A4", compress: false });
		const pdfService = (datacb, endcb) => {
			doc.on("data", datacb);
			doc.on("end", endcb);
			doc.fontSize(24).text("List of Owners Names & Contacts", {
				align: "center",
				width: 550,
			});
			doc.table(table, {
				// A4 595.28 x 841.89 (portrait) (about width sizes)
				width: 550,
				columnsSize: [50, 120, 120, 100, 130],
				prepareHeader: () => doc.font("Helvetica-Bold").fontSize(10),
				prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
					doc.font("Helvetica").fontSize(8);
					indexColumn === 0 && doc.addBackground(rectRow, "blue", 0.15);
				},
			});
			doc.end();
		};

		const stream = res.writeHead(200, {
			"Content-Type": "application/octet-stream",
			"Content-Disposition": "inline;filename=owners.pdf",
		});

		pdfService(
			(chunk) => stream.write(chunk),
			() => stream.end()
		);
	} catch (err) {
		res.status(401).json({
			status: "success",
			message: err.message,
		});
	}
};
exports.getManagers = async (req, res) => {
	try {
		const residences = await Residence.find({}).populate({
			path: "location",
			populate: { path: "zone" },
		});

		// push object arry of the owners details
		let managersArray = [];
		residences.forEach((el) => {
			const data = {
				_id: el._id,
				name: el.name,
				managersName: el.managersName || "N/A",
				managersContact: el.managersContact || "N/A",
				zone: el?.location?.zone?.name,
			};

			managersArray.push(data);
		});

		//sort by name and by zone
		const sortBy = new SortBy(managersArray);
		const results = sortBy.byName().byZone();

		const tableArray = [];
		results.arr.forEach((el, i) => {
			const data = [
				i + 1,
				el.name,
				el.managersName,
				el.managersContact,
				el?.zone,
			];

			tableArray.push(data);
		});

		const table = {
			title: "Managers Details",
			subtitle: "All Available Managers",
			headers: [
				"No.",
				"Hostel Name",
				"Manager's Name",
				"Manager's Contact",
				"zone/Constituency",
			],
			rows: tableArray,
		};
		const doc = new pdfkit({ margin: 30, size: "A4", compress: false });
		const pdfService = (datacb, endcb) => {
			doc.on("data", datacb);
			doc.on("end", endcb);
			doc.fontSize(24).text(`List of Managers Names & Contact `, {
				align: "center",
				width: 550,
			});
			doc.table(table, {
				// A4 595.28 x 841.89 (portrait) (about width sizes)
				width: 550,
				columnsSize: [50, 120, 120, 100, 130],
				padding: 5,
				prepareHeader: () => doc.font("Helvetica-Bold").fontSize(10),
				prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
					doc.font("Helvetica").fontSize(8);
					indexColumn === 0 && doc.addBackground(rectRow, "orange", 0.15);
				},
			});
			doc.text("#Superlax-Technologies", 20, (doc.page.margins.bottom = 5), {
				lineBreak: false,
			});

			doc.end();
		};

		const stream = res.writeHead(200, {
			"Content-Type": "application/pdf",
			"Content-Disposition": "attachment;filename=Managers.pdf",
		});

		pdfService(
			(chunk) => stream.write(chunk),
			() => stream.end()
		);
	} catch (err) {
		res.status(401).json({
			status: "success",
			message: err.message,
		});
	}
};
exports.getPorters = async (req, res) => {
	try {
		const residences = await Residence.find({}).populate({
			path: "location",
			populate: { path: "zone" },
		});
		let portersArray = [];
		residences.forEach((el) => {
			const data = {
				_id: el._id,
				name: el.name,
				portersName: el.portersName || "N/A",
				portersContact: el.portersContact || "N/A",
				zone: el?.location?.zone?.name,
			};

			portersArray.push(data);
		});
		const sortBy = new SortBy(portersArray);
		const results = sortBy.byName().byZone();
		// push object arry of the owners details

		const tableArray = [];
		results.arr.forEach((el, i) => {
			const data = [
				i + 1,
				el.name,
				el.portersName,
				el.portersContact,
				el?.zone,
			];

			tableArray.push(data);
		});

		const table = {
			title: "Porters Details",
			subtitle: "All Available Porters",
			headers: [
				"No.",
				"Hostel Name",
				"Manager's Name",
				"Manager's Contact",
				"zone/Constituency",
			],
			rows: tableArray,
		};
		const doc = new pdfkit({ margin: 30, size: "A4", compress: false });
		const pdfService = (datacb, endcb) => {
			doc.on("data", datacb);
			doc.on("end", endcb);
			doc.fontSize(24).text(`List of Porters Names & Contact `, {
				align: "center",
				width: 550,
			});
			doc.table(table, {
				// A4 595.28 x 841.89 (portrait) (about width sizes)
				width: 550,
				columnsSize: [50, 120, 120, 100, 130],
				padding: 5,
				prepareHeader: () => doc.font("Helvetica-Bold").fontSize(10),
				prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
					doc.font("Helvetica").fontSize(8);
					indexColumn === 0 && doc.addBackground(rectRow, "pink", 0.1);
				},
			});
			doc.text("#Superlax-Technologies", 20, (doc.page.margins.bottom = 5), {
				lineBreak: false,
			});

			doc.end();
		};

		const stream = res.writeHead(200, {
			"Content-Type": "application/pdf",
			"Content-Disposition": "attachment;filename=Porters.pdf",
		});

		pdfService(
			(chunk) => stream.write(chunk),
			() => stream.end()
		);
	} catch (err) {
		res.status(401).json({
			status: "success",
			message: err.message,
		});
	}
};
exports.getHostels = async (req, res) => {
	try {
		const residences = await Residence.find({ residenceType: "Hostel" })
			.populate({ path: "rClass" })
			.populate({
				path: "location",
				populate: { path: "zone" },
			});

		let hostelArray = [];
		residences.forEach((el) => {
			const data = {
				_id: el?._id,
				name: el?.name,
				residenceType: el.residenceType || "N/A",
				location: el.location?.name || "N/A",
				digitalAddress: el?.digitalAddress || "N/A",
				class: el.rClass?.name || "N/A",
				zone: el?.location?.zone?.name,
			};

			hostelArray.push(data);
		});

		const sortBy = new SortBy(hostelArray);
		const results = sortBy.byName().byZone();

		// push object arry of the owners details

		const tableArray = [];
		results.arr.forEach((el, i) => {
			const data = [
				i + 1,
				el.name,
				el.residenceType,
				el.location,
				el.digitalAddress,
				el.class,
				el?.zone,
			];

			tableArray.push(data);
		});

		const table = {
			title: "Hostels Details",
			subtitle: "All Available Hostels",
			headers: [
				"No.",
				"Hostel Name",
				"Residence Type",
				"Location",
				"Digital Address",
				"Class Category",
				"zone/Constituency",
			],
			rows: tableArray,
		};
		const doc = new pdfkit({
			margin: 30,
			size: "A4",
			compress: false,
			layout: "landscape",
		});
		const pdfService = (datacb, endcb) => {
			doc.on("data", datacb);
			doc.on("end", endcb);
			doc.fontSize(24).text(`List of Hostels Names `, {
				align: "center",
				width: 840,
			});

			doc.table(table, {
				// A4 595.28 x 841.89 (portrait) (about width sizes)
				width: 830,
				columnsSize: [50, 150, 100, 100, 120, 120, 150],
				padding: 5,
				prepareHeader: () => doc.font("Helvetica-Bold").fontSize(10),
				prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
					doc.font("Helvetica").fontSize(8);
					indexColumn === 0 && doc.addBackground(rectRow, "orange", 0.1);
				},
			});
			doc.text("#Superlax-Technologies", 20, (doc.page.margins.bottom = 5), {
				lineBreak: false,
			});
			doc.end();
		};

		const stream = res.writeHead(200, {
			"Content-Type": "application/pdf",
			"Content-Disposition": "attachment;filename=Porters.pdf",
		});

		pdfService(
			(chunk) => stream.write(chunk),
			() => stream.end()
		);
	} catch (err) {
		res.status(401).json({
			status: "error",
			message: err.message,
		});
	}
};
exports.getHomesls = async (req, res) => {
	try {
		const residences = await Residence.find({ residenceType: "Homestel" })
			.populate({ path: "rClass" })
			.populate({
				path: "location",
				populate: { path: "zone" },
			});

		let hostelArray = [];
		residences.forEach((el) => {
			const data = {
				_id: el?._id,
				name: el?.name,
				residenceType: el.residenceType || "N/A",
				location: el.location?.name || "N/A",
				digitalAddress: el?.digitalAddress || "N/A",
				class: el.rClass?.name || "N/A",
				zone: el?.location?.zone?.name,
			};

			hostelArray.push(data);
		});

		const sortBy = new SortBy(hostelArray);
		const results = sortBy.byName().byZone();

		// push object arry of the owners details

		const tableArray = [];
		results.arr.forEach((el, i) => {
			const data = [
				i + 1,
				el.name,
				el.residenceType,
				el.location,
				el.digitalAddress,
				el.class,
				el?.zone,
			];

			tableArray.push(data);
		});

		const table = {
			title: "Hometels Details",
			subtitle: "All Available Homestels",
			headers: [
				"No.",
				"Hostel Name",
				"ResidenceType",
				"Location",
				"Digital Address",
				"Class Category",
				"zone/Constituency",
			],
			rows: tableArray,
		};
		const doc = new pdfkit({
			margin: 30,
			size: "A4",
			compress: false,
			layout: "landscape",
		});
		const pdfService = (datacb, endcb) => {
			doc.on("data", datacb);
			doc.on("end", endcb);
			doc.fontSize(24).text(`List of Hometels Names `, {
				align: "center",
				width: 830,
			});
			doc.table(table, {
				// A4 595.28 x 841.89 (portrait) (about width sizes)
				width: 840,
				columnsSize: [50, 150, 100, 100, 120, 120, 150],
				padding: 5,
				prepareHeader: () => doc.font("Helvetica-Bold").fontSize(10),
				prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
					doc.font("Helvetica").fontSize(8);
					indexColumn === 0 && doc.addBackground(rectRow, "orange", 0.1);
				},
			});
			doc.text("#Superlax-Technologies", 20, (doc.page.margins.bottom = 5), {
				lineBreak: false,
			});
			doc.end();
		};

		const stream = res.writeHead(200, {
			"Content-Type": "application/pdf",
			"Content-Disposition": "attachment;filename=Porters.pdf",
		});

		pdfService(
			(chunk) => stream.write(chunk),
			() => stream.end()
		);
	} catch (err) {
		res.status(401).json({
			status: "error",
			message: err.message,
		});
	}
};
exports.geRegisteredResidences = async (req, res) => {
	try {
		const academic_year = await AcademicYear.find().sort({ _id: -1 }).limit(1);

		const currentRegistered = await RegistrationTable.find({
			academicYear: { _id: `${academic_year[0]?._id}` },
			status: 1,
		})
			.populate({ path: "addedBy" })
			.populate({
				path: "residence",
				populate: { path: "location", populate: { path: "zone" } },
			});
		let hostelArray = [];
		currentRegistered.forEach((el) => {
			const data = {
				_id: el?._id,
				name: el?.residence?.name,
				location: el?.residence?.location?.name,
				date: el.createdAt || el?.updatedAt,
				addedBy: el?.addedBy?.username,
				zone: el?.residence?.location?.zone?.name,
			};

			hostelArray.push(data);
		});

		const sortBy = new SortBy(hostelArray);
		const results = sortBy.byName().byZone();

		// push object arry of the owners details

		const tableArray = [];
		results.arr.forEach((el, i) => {
			const data = [
				i + 1,
				el.name,
				el.location,
				myFormat(el.date, " mmmm dS, yyyy,"),
				el.addedBy,
				el?.zone,
			];

			tableArray.push(data);
		});

		const table = {
			title: "Registered Residences",
			subtitle: `All Registered Residences of the ${academic_year[0].name}`,
			headers: [
				"No.",
				"Hostel Name",
				"Location",
				"Reg. Date",
				"Registered By",
				"Zone/Constituency",
			],
			rows: tableArray,
		};
		const doc = new pdfkit({
			margin: 30,
			size: "A4",
			compress: false,
		});
		const pdfService = (datacb, endcb) => {
			doc.on("data", datacb);
			doc.on("end", endcb);
			doc.fontSize(24).text(`List of Registered Residences `, {
				align: "center",
				width: 590,
			});
			doc.table(table, {
				// A4 595.28 x 841.89 (portrait) (about width sizes)
				width: 590,
				columnsSize: [40, 100, 100, 80, 80, 100],
				padding: 5,
				prepareHeader: () => doc.font("Helvetica-Bold").fontSize(10),
				prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
					doc.font("Helvetica").fontSize(8);
					indexColumn === 0 && doc.addBackground(rectRow, "orange", 0.1);
				},
			});
			doc.text("#Superlax-Technologies", 20, (doc.page.margins.bottom = 5), {
				lineBreak: false,
			});
			doc.end();
		};

		const stream = res.writeHead(200, {
			"Content-Type": "application/pdf",
			"Content-Disposition": "attachment;filename=RegisteredResidences.pdf",
		});

		pdfService(
			(chunk) => stream.write(chunk),
			() => stream.end()
		);
	} catch (err) {
		res.status(401).json({
			status: "error",
			message: err.message,
		});
	}
};

exports.getRegisteredNumber = async (req, res) => {
	try {
		const academic_year = await AcademicYear.find().sort({ _id: -1 }).limit(1);

		const currentRegistered = await RegistrationTable.find({
			academicYear: { _id: `${academic_year[0]?._id}` },
			status: 1,
		})
			.populate({ path: "addedBy" })
			.populate({
				path: "residence",
				populate: { path: "location", populate: { path: "zone" } },
			});
		let hostelArray = [];
		currentRegistered.forEach((el) => {
			const data = {
				_id: el?._id,
				residenceType: el?.residence?.residenceType,
				portersName: el?.residence?.portersName,
				managersName: el?.residence?.managersName,
				owners: el?.residence?.ownersCount,
				name: el?.residence?.name,
				location: el?.residence?.location?.name,
				date: el.createdAt || el?.updatedAt,
				addedBy: el?.addedBy?.username,
				zone: el?.residence?.location?.zone?.name,
			};

			hostelArray.push(data);
		});

		const sortBy = new SortBy(hostelArray);
		const results = sortBy.byName().byZone();

		// push object arry of the owners details

		const tableArray = [];
		let residencesCount = 0;
		let hostelsCount = 0;
		let homestelsCount = 0;
		let managersCount = 0;
		let portersCount = 0;
		let ownersCount = 0;
		results.arr.forEach((el, i) => {
			residencesCount++;
			if (el.residenceType === "Hostel") {
				hostelsCount++;
			}
			if (el.residenceType === "Homestel") {
				homestelsCount++;
			}
			if (el.portersName) {
				portersCount++;
			}
			if (el.managersName) {
				managersCount++;
			}
			if (el.ownersName) {
				ownersCount++;
			}

			// const data = [
			// 	i + 1,
			// 	el.name,
			// 	el.residenceType,
			// 	el.location,
			// 	myFormat(el.date, " mmmm dS, yyyy,"),
			// 	el.addedBy,
			// 	el?.zone,
			// ];

			// tableArray.push(data);
		});

		res.status(200).json({
			status: "success",
			data: {
				hostelsCount: hostelsCount,
				homestelsCount: homestelsCount,
				residencesCount: residencesCount,
				ownersCount: managersCount,
				managersCount: managersCount,
				portersCount: portersCount,
			},
		});
	} catch (err) {
		res.status(401).json({
			status: "error",
			message: err.message,
		});
	}
};

exports.testStram = async (req, res) => {
	let pdfDoc = new PDFDocument();
	pdfDoc.pipe(fs.createWriteStream("SampleDocument.pdf"));
	pdfDoc.text("My Sample PDF Document");
	pdfDoc.end();

	const stream = res.writeHead(200, {
		"Content-Type": "application/pdf",
		"Content-Disposition": "attachment;filename=RegisteredResidences.pdf",
	});
};
