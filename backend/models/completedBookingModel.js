const mongoose = require("mongoose");

const bookedSchema = mongoose.Schema(
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
    providerId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Provider",
    },

    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },

    streetAddress: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pin: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: Number,
      required: true,
    },
    serviceSize: {
      type: String,
      required: true,
    },
    serviceTime: {
      type: String,
      required: true,
    },
    serviceName: {
      type: String,
      required: true,
    },
    serviceLocation: {
      type: String,
      require: true,
    },
    serviceDate: {
      type: String,
      required: true,
    },
    serviceDetails: {
      type: String,
      required: true,
    },
    status :{
      type: String,
      default: 'booked',
    }
  },
  {
    timestamps: true,
  }
);

const Booked = mongoose.model("Booked", bookedSchema);

module.exports = Booked;

