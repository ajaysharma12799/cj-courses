const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Please Enter Username"],
    lowercase: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Please Enter Email"],
    lowercase: true,
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Please Enter Password"],
  },
  role: {
    default: "user",
    type: String,
    enum: ["user", "admin"],
    required: [true, "Please Enter Role of User"],
    trim: true,
  },
});

module.exports = mongoose.model("users", UserSchema);
