const mongoose = require("mongoose");

const serviceCategorySchema = new mongoose.Schema(
  {
    serviceType: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    serviceTypeDescription: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
   
  }
);

const ServiceCategory = mongoose.model(
  "ServiceCategory",
  serviceCategorySchema
);

module.exports = ServiceCategory;
