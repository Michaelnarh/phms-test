const Hostel = require("../Models/hostelModel");

//create new Hostel
exports.createHostel = async (req, res) => {
  try {
    const newHostel = await Hostel.create(req.body);
    res.status(201).json({
      status: "success",
      newHostel,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

//update an info about a hostel
exports.updateHostel = async (req, res) => {
  if (!req.params.id) {
    throw Error("Hostel  not identified");
  }
  try {
    const hostel = await Hostel.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).json({
      status: "success",
      hostel,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

//get a particular  hostel
exports.getHostel = async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id).populate("reviews");
    res.status(200).json({
      status: "success",
      hostel,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

// get all hostels
exports.getAllHostels = async (req, res) => {
  try {
    const hostels = await Hostel.find();

    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    let query = await Hostel.find(JSON.parse(queryStr));

    // if (req.query.sort) {
    //   const sortBy = req.query.sort.split(",").join(" ");
    //   query = query.sort(sortBy);
    // } else {
    //   query.sort("-createdAt");
    // }

    //fields limiting
    // if (req.query.fields) {
    //   const fields = req.query.limi.split(",").join(" ");
    //   query = query.select(fields);
    // } else {
    //   query = query.select("-__v");
    // }
    //  const page = (req.query.page * 1) | 1;
    //     const limit = (req.query.limit * 1) | 30;
    //     const skip = (page - 1) * limit;

    //     query = query.skip(skip).limit(limit);
    //pagination

    res.status(200).json({
      status: "success",
      message: hostels,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

// Delete a hostel record

exports.deleteHostel = async (req, res, next) => {
  try {
    const hostel_id = req.params.id;
    if (!hostel_id) throw new Error("Hostel id is required for this operation");
    const hostel = await Hostel.findById(hostel_id);
    await Hostel.findByIdAndDelete(hostel_id);
    res.status(200).json({
      status: "success",
      message: `Hostel records of  ${hostel.name}was  deleted successfully`,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
