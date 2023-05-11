const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/DBConfig");

// Router File
const BootcampRoute = require("./routes/bootcamp.routes");

const app = express();
const PORT = process.env.PORT || 4321;

if (process.env.NODE_ENV === "developement") {
  require("dotenv").config();
  morgan("dev");
}

app.use(express.json());
app.use(cors());
connectDB();

// Test Endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    msg: "API Working Successfully",
  });
});

// Mount Routers
app.use("/api/v1/bootcamp", BootcampRoute);

app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  }

  console.log(`Server Running on http://localhost:${PORT}`);
});
