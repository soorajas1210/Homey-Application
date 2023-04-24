const mongoose = require("mongoose");

const addLocationSchema = mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Location = mongoose.model("Location", addLocationSchema);


module.exports = Location;