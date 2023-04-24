const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    serviceId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Service",
    },
    location: {
      type: String,
      require: true,
    },
    taskSize: {
      type: String,
      require: true,
    },
    taskDetails: {
      type: String,
      require: true,
    },
    date: {
      type: String,
    },
    taskTime: {
      type: String,
    },
    providerId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
