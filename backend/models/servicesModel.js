const mongoose = require("mongoose");

const servicesSchema = new mongoose.Schema(
  {
    serviceType: {
      type: String,
      required: true,
    },
    serviceName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    serviceDescription: {
      type: String,
      required: true,
    },
    locations: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model("Service", servicesSchema);

module.exports = Service;
