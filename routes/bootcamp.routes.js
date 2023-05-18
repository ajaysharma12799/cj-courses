const express = require("express");
const router = express.Router();
const {
  getAllBootcamp,
  getSingleBootcamp,
  addBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require("../controller/bootcamp.controller");

// Admin Middleware Import
const { isAdmin } = require('../middleware/isAdmin');

router.get("/", getAllBootcamp);

router.get("/:id", getSingleBootcamp);

router.post("/", isAdmin, addBootcamp);

router.put("/:id", isAdmin, updateBootcamp);

router.delete("/:id", isAdmin, deleteBootcamp);

module.exports = router;
