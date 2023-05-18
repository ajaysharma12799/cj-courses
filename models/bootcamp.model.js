const mongoose = require("mongoose");

const BootcampSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add Bootcamp Name"],
      unique: true,
      trim: true,
      maxlength: [50, "Name can not be more than 50 Characters"],
    },
    slug: String,
    description: {
      type: String,
      required: [true, "Please add Bootcamp Description"],
      trim: true,
      maxlength: [500, "Description can not be more than 500 Characters"],
    },
    phone: {
      type: String,
      required: [true, "Please add Bootcamp Contact Number"],
      trim: true,
      minlength: [10, "Contact Number can not be less than 10 Digit"],
      maxlength: [10, "Contact Number can not be more than 10 Digit"],
    },
    careers: {
      type: [String],
      required: [true, "Please add Bootcamp Career Options"],
      trim: true,
      enum: [
        "Web Developement",
        "App Developement",
        "UI UX Developement",
        "Cloud Developement",
        "Game Developement",
        "Business",
      ],
    },
    jobAssistance: {
      type: Boolean,
      required: true,
      default: false,
    },
    jobGuarantee: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("bootcamp", BootcampSchema);
