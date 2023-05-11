const getAllBootcamp = (req, res) => {
  res.send("Get All Bootcamp");
};

const getSingleBootcamp = (req, res) => {
  res.send("Get Single Bootcamp");
};

const addBootcamp = (req, res) => {
  res.send("Add New Bootcamp");
};

const updateBootcamp = (req, res) => {
  res.send("Update Existing Bootcamp");
};

const deleteBootcamp = (req, res) => {
  res.send("Delete Existing Bootcamp");
};

module.exports = {
  getAllBootcamp,
  getSingleBootcamp,
  addBootcamp,
  updateBootcamp,
  deleteBootcamp,
};
