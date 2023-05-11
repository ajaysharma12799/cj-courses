const express = require("express");
const router = express.Router();
const {
  getAllBootcamp,
  getSingleBootcamp,
  addBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require("../controller/bootcamp.controller");

router.get("/", getAllBootcamp);

router.get("/:id", getSingleBootcamp);

router.post("/", addBootcamp);

router.put("/:id", updateBootcamp);

router.delete("/:id", deleteBootcamp);

module.exports = router;
