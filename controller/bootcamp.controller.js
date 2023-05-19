const BootcampModel = require("../models/bootcamp.model");
const mongoose = require("mongoose");

const getAllBootcamp = async (req, res) => {
  try {
    let query;

    // Copy Request Query
    const reqQuery = { ...req.query };

    // Selected Fields
    const selectedFields = ["page", "limit"];

    // Remove Selected Fields From Req Query
    selectedFields.forEach((params) => delete reqQuery[params]);

    let queryString = JSON.stringify(reqQuery);

    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    query = BootcampModel.find(JSON.parse(queryString)).sort({
      createdAt: -1,
    });

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    const bootcamps = await query;
    res.status(200).json({
      status: "success",
      totalResult: bootcamps.length,
      data: bootcamps,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: "Failed to Fetch All Bootcamps",
    });
  }
};

const getSingleBootcamp = async (req, res) => {
  try {
    const bootcampID = req.params.id;
    if (!mongoose.isValidObjectId(bootcampID)) {
      return res.status(400).json({
        status: "failed",
        error: "Invalid Object ID",
      });
    }
    const bootcamp = await BootcampModel.findById(bootcampID);
    res.status(200).json({
      status: "success",
      data: bootcamp,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: "Failed to Fetch Bootcamp",
    });
  }
};

const addBootcamp = async (req, res) => {
  try {
    const newBootcamp = new BootcampModel(req.body);
    await newBootcamp.save();
    res.status(200).json({
      status: "success",
      data: newBootcamp,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};

const updateBootcamp = async (req, res) => {
  try {
    const bootcampID = req.params.id;
    if (!mongoose.isValidObjectId(bootcampID)) {
      return res.status(400).json({
        status: "failed",
        error: "Invalid Object ID",
      });
    }
    const bootcamp = await BootcampModel.findById(bootcampID);
    if (!bootcamp) {
      return res.status(400).json({
        status: "failed",
        error: `Bootcamp with ${bootcampID} does not exist`,
      });
    }

    // await bootcamp.deleteOne();
    const updatedBootcamp = await BootcampModel.findByIdAndUpdate(
      bootcampID,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: updatedBootcamp, // Return Updated Bootcamp
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      error: "Failed to Update Bootcamp",
    });
  }
};

const deleteBootcamp = async (req, res) => {
  try {
    const bootcampID = req.params.id;
    if (!mongoose.isValidObjectId(bootcampID)) {
      return res.status(400).json({
        status: "failed",
        error: "Invalid Object ID",
      });
    }
    const bootcamp = await BootcampModel.findById(bootcampID);
    if (!bootcamp) {
      return res.status(400).json({
        status: "failed",
        error: `Bootcamp with ${bootcampID} does not exist`,
      });
    }

    await bootcamp.deleteOne();
    res.status(200).json({
      status: "success",
      data: bootcamp, // Return Deleted Bootcamp
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      error: "Failed to Delete Bootcamp",
    });
  }
};

module.exports = {
  getAllBootcamp,
  getSingleBootcamp,
  addBootcamp,
  updateBootcamp,
  deleteBootcamp,
};
