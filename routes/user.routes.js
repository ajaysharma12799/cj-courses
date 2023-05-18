const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../controller/user.controller");

// Admin Middleware Import
const { isAdmin } = require("../middleware/isAdmin");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/getAllUsers", isAdmin, getAllUsers);

module.exports = router;
