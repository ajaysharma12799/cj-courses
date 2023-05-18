const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");
    res.status(200).json({
      status: "success",
      totalResult: users.length,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const user = await UserModel.findOne({ email }); // Check If User is Already Present or Not
    if (user) {
      return res.status(400).json({
        status: "failed",
        error: "User Already Exist",
      });
    }

    // Hashing Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      status: "success",
      token: generateToken(newUser?._id), // Generating Token Based on ID
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }); // Check If User is not Present
    if (!user) {
      return res.status(400).json({
        status: "failed",
        error: "User does not Exist",
      });
    }

    // Compare Password
    const isMatch = await bcrypt.compare(password, user?.password);
    if (!isMatch) {
      return res.status(400).json({
        status: "failed",
        error: "Password does not match",
      });
    }

    res.status(200).json({
      status: "success",
      token: generateToken(user?._id), // Generating Token Based on ID
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
};
