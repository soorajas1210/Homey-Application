const mongoose = require("mongoose");

const serviceProviderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    workLocation: {
      type: String,
      required: true,
    },
    serviceCategory: {
      type: String,
      required: true,
    },
    serviceCharge: {
      type: String,
      required: true,
    },

    workHours: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    profileImage: {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
    idProof: {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
    country: {
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
  },
  {
    timestamps: true,
  }
);

const Provider = mongoose.model("Provider", serviceProviderSchema);
module.exports = Provider;
